const { urlsMap } = require('./containers');

function generateURL() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let hash = '';
  for (let i = 0; i < 6; i++) {
    hash += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  if (urlsMap.has(hash)) {
    return generateURL();
  }
  
  return hash;
}

module.exports = generateURL;
