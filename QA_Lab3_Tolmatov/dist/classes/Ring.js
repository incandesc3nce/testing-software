"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ring = void 0;
const Jewelry_1 = require("./Jewelry");
/**
 * Дочерний класс "Кольцо" (наследуется от класса Jewelry).
 * Добавляет свойство "size" - размер кольца и методы для работы с ним.
 *
 * ![Кольцо](../../assets/ring.png)
 * @extends Jewelry
 */
class Ring extends Jewelry_1.Jewelry {
    /**
     * Конструктор класса Ring.
     * Инициализирует вес, цену за грамм и размер кольца.
     * Если размер не передан, то по умолчанию передается 'M'.
     * @param {number} weight
     * @param {number} pricePerGram
     * @param {RingSize} size
     */
    constructor(weight, pricePerGram, size = 'M') {
        super(weight, pricePerGram);
        /**
         * Размер кольца.
         * @private
         * @default 'M'
         * @type {RingSize}
         */
        this.size = 'M';
        this.size = size !== null && size !== void 0 ? size : 'M';
    }
    /**
     * Метод для преобразования размера кольца в длину.
     * @param {RingSize} size
     * @returns Длина кольца в миллиметрах
     * @private
     */
    mapSizeToLength(size) {
        switch (size) {
            case 'XS':
                return 14;
            case 'S':
                return 16;
            case 'M':
                return 18;
            case 'L':
                return 21;
            case 'XL':
                return 23;
        }
    }
    /**
    * Метод для ручной инициализации веса, цены за грамм и размера кольца.
    * @param {number} weight - Вес кольца в граммах
    * @param {number} pricePerGram - Цена за грамм кольца в рублях
    * @param {RingSize} size - Размер кольца
    * @override
    * @public
    */
    init(weight, pricePerGram, size) {
        super.init(weight, pricePerGram);
        this.size = size !== null && size !== void 0 ? size : 'M';
    }
    /**
     * Метод для вывода веса, цены за грамм и размера кольца в консоль.
     * @override
     * @public
     */
    display() {
        super.display();
        console.log(`Размер кольца: ${this.size}`);
    }
    /**
     * Метод для расчета полной стоимости кольца.
     * Формула $$Полная стоимость кольца = Вес \times Цена за грамм \times Длина$$
     * @returns {number} Полная стоимость кольца в рублях
     * @public
     */
    getFullPrice() {
        const ringSize = this.mapSizeToLength(this.size);
        return this.weight * this.pricePerGram * ringSize;
    }
}
exports.Ring = Ring;
