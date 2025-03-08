"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Necklace = void 0;
const Jewelry_1 = require("./Jewelry");
/**
 * Дочерний класс "Ожерелье" (наследуется от класса Jewelry).
 * Добавляет свойство "length" - длина ожерелья и методы для работы с ним.
 *
 * ![Ожерелье](../../assets/necklace.png)
 * @extends Jewelry
 */
class Necklace extends Jewelry_1.Jewelry {
    /**
     * Конструктор класса Necklace.
     * Инициализирует вес, цену за грамм и длину ожерелья.
     * Если длина не передана, то по умолчанию передается 0.
     * @param {number} weight
     * @param {number} pricePerGram
     * @param {number} length
     */
    constructor(weight, pricePerGram, length) {
        super(weight, pricePerGram);
        this.length = length !== null && length !== void 0 ? length : 0;
    }
    /**
     * Метод для ручной инициализации веса, цены за грамм и длины ожерелья.
     * @param {number} weight - Вес ожерелья в граммах
     * @param {number} pricePerGram - Цена за грамм ожерелья в рублях
     * @param {number} length - Длина ожерелья в сантиметрах
     * @override
     * @public
     */
    init(weight, pricePerGram, length) {
        super.init(weight, pricePerGram);
        this.length = length !== null && length !== void 0 ? length : 0;
    }
    /**
     * Метод для вывода веса, цены за грамм и длины ожерелья в консоль.
     * @override
     * @public
     */
    display() {
        super.display();
        console.log(`Длина: ${this.length} см`);
    }
    /**
     * Метод для расчета полной стоимости ожерелья.
     * Формула: $$Полная стоимость ожерелья = Вес \times Цена за грамм \times Длина$$
     * @returns {number} Полная стоимость ожерелья в рублях
     * @public
     */
    getFullPrice() {
        return this.weight * this.pricePerGram * this.length;
    }
}
exports.Necklace = Necklace;
