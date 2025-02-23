/* eslint-disable no-undef */

const request = require('supertest');
const app = require('../app');
const { BASE_URL } = require('../utils/env');

describe('POST /shorten', () => {
  it('создает короткую ссылку', async () => {
    const response = await request(app)
      .post('/shorten')
      .send({ originalUrl: 'https://example.com' })
      .expect(201);

    expect(response.body.shortenedUrl).toMatch(
      new RegExp(`${BASE_URL}/[a-zA-Z0-9]{6}`)
    );
  });

  it('возвращает ошибку, если URL не указан', async () => {
    const response = await request(app).post('/shorten').send({}).expect(400);

    expect(response.body.message).toBe('URL is required');
  });

  it('создает ссылку с алиасом', async () => {
    const response = await request(app)
      .post('/shorten')
      .send({ originalUrl: 'https://example.com', alias: 'example' })
      .expect(201);

    expect(response.body.shortenedUrl).toBe(`${BASE_URL}/example`);
  });

  it('возвращает ошибку 409, если алиас занят', async () => {
    await request(app)
      .post('/shorten')
      .send({ originalUrl: 'https://example.com', alias: 'example' });

    const response = await request(app)
      .post('/shorten')
      .send({ originalUrl: 'https://example.com', alias: 'example' })
      .expect(409);

    expect(response.body.message).toBe('Alias already in use');
  });

  it('возвращает ошибку, если алиас длиннее 20 символов', async () => {
    const response = await request(app)
      .post('/shorten')
      .send({ originalUrl: 'https://example.com', alias: 'a'.repeat(21) })
      .expect(400);

    expect(response.body.message).toBe(
      'Alias must not be longer than 20 characters'
    );
  });

  it('возвращает ошибку, если алиас содержит недопустимые символы', async () => {
    const response = await request(app)
      .post('/shorten')
      .send({ originalUrl: 'https://example.com', alias: '$example!' })
      .expect(400);

    expect(response.body.message).toBe(
      'Alias can only contain alphanumeric characters'
    );
  });

  it('создает ссылку с датой истечения', async () => {
    const response = await request(app)
      .post('/shorten')
      .send({ originalUrl: 'https://example.com', expiresAt: '2025-02-25' })
      .expect(201);

    expect(response.body.shortenedUrl).toMatch(
      new RegExp(`${BASE_URL}/[a-zA-Z0-9]{6}`)
    );
  });

  it('создает ссылку с алиасом и датой истечения', async () => {
    const response = await request(app)
      .post('/shorten')
      .send({
        originalUrl: 'https://examples.com',
        alias: 'examples',
        expiresAt: '2025-02-25',
      })
      .expect(201);

    expect(response.body.shortenedUrl).toBe(`${BASE_URL}/examples`);
  });
});

describe('GET /:shortUrl', () => {
  it('перенаправляет на оригинальный URL', async () => {
    const response = await request(app)
      .post('/shorten')
      .send({ originalUrl: 'https://example.com' });

    const shortUrl = response.body.shortenedUrl.split('/').pop();

    await request(app).get(`/${shortUrl}`).expect(302);
  });

  it('возвращает ошибку 410, если ссылка истекла', async () => {
    const response = await request(app)
      .post('/shorten')
      .send({
        originalUrl: 'https://example.com',
        expiresAt: '2025-02-20',
      });

    const shortUrl = response.body.shortenedUrl.split('/').pop();

    const res = await request(app).get(`/${shortUrl}`).expect(410);

    expect(res.body.message).toBe('URL expired');
  });

  it('возвращает ошибку 404, если ссылка не найдена', async () => {
    const res = await request(app).get('/not-found').expect(404);

    expect(res.body.message).toBe('URL not found');
  });
});

describe('GET /info/:shortUrl', () => {
  it('возвращает информацию о ссылке', async () => {
    const response = await request(app)
      .post('/shorten')
      .send({ originalUrl: 'https://example.com' });

    const shortUrl = response.body.shortenedUrl.split('/').pop();

    const res = await request(app).get(`/info/${shortUrl}`).expect(200);

    expect(res.body).toMatchObject({
      originalUrl: 'https://example.com',
      createdAt: expect.any(String),
      expiresAt: null,
      clickCount: 0,
    });
  });

  it('возвращает ошибку 404, если ссылка не найдена', async () => {
    const res = await request(app).get('/info/not-found').expect(404);

    expect(res.body.message).toBe('URL not found');
  });
});

describe('DELETE /delete/:shortUrl', () => {
  it('удаляет ссылку', async () => {
    const response = await request(app)
      .post('/shorten')
      .send({ originalUrl: 'https://example.com' });

    const shortUrl = response.body.shortenedUrl.split('/').pop();

    await request(app).delete(`/delete/${shortUrl}`).expect(200);
  });

  it('возвращает ошибку 404, если ссылка не найдена', async () => {
    const res = await request(app).delete('/delete/not-found').expect(404);

    expect(res.body.message).toBe('URL not found');
  });
});

describe('GET /analytics/:shortUrl', () => {
  it('возвращает информацию о посещениях', async () => {
    const response = await request(app)
      .post('/shorten')
      .send({ originalUrl: 'https://example.com' });

    const shortUrl = response.body.shortenedUrl.split('/').pop();

    const res = await request(app).get(`/analytics/${shortUrl}`).expect(200);

    expect(res.body).toMatchObject({
      visits: 0,
      lastFiveVisitsIP: [],
    });
  });

  it('возвращает последние 5 IP-адресов', async () => {
    const response = await request(app)
      .post('/shorten')
      .send({ originalUrl: 'https://example.com' });

    const shortUrl = response.body.shortenedUrl.split('/').pop();

    for (let i = 0; i < 10; i++) {
      await request(app).get(`/${shortUrl}`);
    }

    const res = await request(app).get(`/analytics/${shortUrl}`).expect(200);

    expect(res.body.lastFiveVisitsIP).toHaveLength(5);
  });

  it('возвращает точное количество посещений', async () => {
    const n = 5;

    const response = await request(app)
      .post('/shorten')
      .send({ originalUrl: 'https://example.com' });

    const shortUrl = response.body.shortenedUrl.split('/').pop();

    for (let i = 0; i < n; i++) {
      await request(app).get(`/${shortUrl}`);
    }

    const res = await request(app).get(`/analytics/${shortUrl}`).expect(200);

    expect(res.body.visits).toBe(n);
  });

  it('возвращает ошибку 404, если ссылка не найдена', async () => {
    const res = await request(app).get('/analytics/not-found').expect(404);

    expect(res.body.message).toBe('URL not found');
  });
});