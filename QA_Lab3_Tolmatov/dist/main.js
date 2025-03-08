"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("./classes");
const necklace = new classes_1.Necklace(20, 100, 50);
const ring = new classes_1.Ring(10, 200, 'L');
necklace.display();
console.log(`Полная стоимость ожерелья: $${necklace.getFullPrice()}`);
ring.display();
console.log(`Полная стоимость кольца: $${ring.getFullPrice()}`);
