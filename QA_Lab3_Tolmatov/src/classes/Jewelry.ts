/**
 * Абстрактный родительский класс "Ювелирное изделие"
 * @abstract
 *
 * @mermaid
 *   graph TD;
 *    Jewelry --> Necklace;
 *    Jewelry --> Ring;
 */
export abstract class Jewelry {
  /**
   * Вес изделия в граммах.
   * @protected
   * @default 0
   * @type {number}
   */
  protected weight: number = 0;

  /**
   * Цена за грамм изделия в рублях.
   * @protected
   * @default 0
   * @type {number}
   */
  protected pricePerGram: number = 0;

  /**
   * Конструктор класса Jewelry. Инициализирует вес и цену за грамм изделия.
   * @param {number} weight - Вес изделия в граммах
   * @param {number} pricePerGram - Цена за грамм изделия в рублях
   */
  constructor(weight?: number, pricePerGram?: number) {
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
  public init(weight: number, pricePerGram: number): void {
    this.weight = weight;
    this.pricePerGram = pricePerGram;
  }

  /**
   * Метод для вывода веса и цены за грамм изделия в консоль.
   * @public
   */
  public display(): void {
    console.log(`Вес: ${this.weight} грамм`);
    console.log(`Цена за грамм: ${this.pricePerGram} ₽`);
  }

  /**
   * Абстрактный метод для получения цены изделия.
   * Ювелирные изделия могут иметь характеристики, 
   * которые будут напрямую влиять на цену, поэтому
   * детали реализации остаются за дочерними классами.
   */
  public abstract getFullPrice(): number;
}
