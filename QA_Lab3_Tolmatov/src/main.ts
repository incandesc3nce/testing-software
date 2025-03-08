import { Necklace, Ring } from './classes';

const necklace = new Necklace(20, 100, 50);
const ring = new Ring(10, 200, 'L');

necklace.display();
console.log(`Полная стоимость ожерелья: $${necklace.getFullPrice()}`);

ring.display();
console.log(`Полная стоимость кольца: $${ring.getFullPrice()}`);

