"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jewelry = void 0;
/**
 * Абстрактный родительский класс "Ювелирное изделие"
 * @abstract
 *
 * @mermaid
 *   graph TD;
 *    Jewelry --> Necklace;
 *    Jewelry --> Ring;
 */
class Jewelry {
    /**
     * Конструктор класса Jewelry. Инициализирует вес и цену за грамм изделия.
     * @param {number} weight - Вес изделия в граммах
     * @param {number} pricePerGram - Цена за грамм изделия в рублях
     */
    constructor(weight, pricePerGram) {
        /**
         * Вес изделия в граммах.
         * @protected
         * @default 0
         * @type {number}
         */
        this.weight = 0;
        /**
         * Цена за грамм изделия в рублях.
         * @protected
         * @default 0
         * @type {number}
         */
        this.pricePerGram = 0;
        if (weight !== undefined && pricePerGram !== undefined) {
            this.weight = weight;
            this.pricePerGram = pricePerGram;
        }
    }
    /**
     * Метод для ручной инициализации веса и цены за грамм изделия.
     * @param {number} weight - Вес изделия в граммах
     * @param {number} pricePerGram - Цена за грамм изделия в рублях
     * @public
     */
    init(weight, pricePerGram) {
        this.weight = weight;
        this.pricePerGram = pricePerGram;
    }
    /**
     * Метод для вывода веса и цены за грамм изделия в консоль.
     * @public
     */
    display() {
        console.log(`Вес: ${this.weight} грамм`);
        console.log(`Цена за грамм: ${this.pricePerGram} ₽`);
    }
}
exports.Jewelry = Jewelry;
