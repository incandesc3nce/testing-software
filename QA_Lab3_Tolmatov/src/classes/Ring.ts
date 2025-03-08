import { Jewelry } from './Jewelry';

/**
 * Тип размеров кольца.
 */
type RingSize = ('XS' | 'S' | 'M' | 'L' | 'XL');

/**
 * Дочерний класс "Кольцо" (наследуется от класса Jewelry).
 * Добавляет свойство "size" - размер кольца и методы для работы с ним.
 * 
 * ![Кольцо](../../assets/ring.png)
 * @extends Jewelry
 */
export class Ring extends Jewelry {
  /**
   * Размер кольца.
   * @private
   * @default 'M'
   * @type {RingSize}
   */
  private size: RingSize = 'M';

  /**
   * Конструктор класса Ring. 
   * Инициализирует вес, цену за грамм и размер кольца. 
   * Если размер не передан, то по умолчанию передается 'M'.
   * @param {number} weight
   * @param {number} pricePerGram
   * @param {RingSize} size
   */
  constructor(weight?: number, pricePerGram?: number, size: RingSize = 'M') {
    super(weight, pricePerGram);
    this.size = size ?? 'M';
  }

  /**
   * Метод для преобразования размера кольца в длину.
   * @param {RingSize} size 
   * @returns Длина кольца в миллиметрах
   * @private
   */
  private mapSizeToLength(size: RingSize): number {
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
  public override init(weight: number, pricePerGram: number, size?: RingSize): void {
    super.init(weight, pricePerGram);
    this.size = size ?? 'M';
  }

  /**
   * Метод для вывода веса, цены за грамм и размера кольца в консоль.
   * @override
   * @public
   */
  public override display(): void {
    super.display();
    console.log(`Размер кольца: ${this.size}`);
  }

  /**
   * Метод для расчета полной стоимости кольца.
   * Формула $$Полная стоимость кольца = Вес \times Цена за грамм \times Длина$$
   * @returns {number} Полная стоимость кольца в рублях
   * @public
   */
  public getFullPrice(): number {
    const ringSize = this.mapSizeToLength(this.size);
    return this.weight * this.pricePerGram * ringSize;
  }
}
