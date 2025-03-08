import { Jewelry } from './Jewelry';

/**
 * Дочерний класс "Ожерелье" (наследуется от класса Jewelry).
 * Добавляет свойство "length" - длина ожерелья и методы для работы с ним.
 * 
 * ![Ожерелье](../../assets/necklace.png)
 * @extends Jewelry
 */
export class Necklace extends Jewelry {
  /**
   * Длина ожерелья в сантиметрах.
   * @private
   * @default 0
   * @type {number}
   */
  private length: number;

  /**
   * Конструктор класса Necklace. 
   * Инициализирует вес, цену за грамм и длину ожерелья. 
   * Если длина не передана, то по умолчанию передается 0.
   * @param {number} weight
   * @param {number} pricePerGram
   * @param {number} length
   */
  constructor(weight?: number, pricePerGram?: number, length?: number) {
    super(weight, pricePerGram);
    this.length = length ?? 0;
  }
  
  /**
   * Метод для ручной инициализации веса, цены за грамм и длины ожерелья.
   * @param {number} weight - Вес ожерелья в граммах
   * @param {number} pricePerGram - Цена за грамм ожерелья в рублях
   * @param {number} length - Длина ожерелья в сантиметрах
   * @override 
   * @public
   */
  public override init(weight: number, pricePerGram: number, length?: number): void {
    super.init(weight, pricePerGram);
    this.length = length ?? 0;
  }

  /**
   * Метод для вывода веса, цены за грамм и длины ожерелья в консоль.
   * @override
   * @public
   */
  public override display(): void {
    super.display();
    console.log(`Длина: ${this.length} см`);
  }

  /**
   * Метод для расчета полной стоимости ожерелья.
   * Формула: $$Полная стоимость ожерелья = Вес \times Цена за грамм \times Длина$$
   * @returns {number} Полная стоимость ожерелья в рублях
   * @public
   */
  public getFullPrice(): number {
    return this.weight * this.pricePerGram * this.length;
  }
}
