/* // Boxs:
  shipment	Отгрузка
  acceptance	Приемка
  basic	Основное хранение
  special	Особые условия
  falsification	Фальсификат и контрафакт
  quarantine	Карантинное хранение
  sampling	Отбор образцов
*/

export const boxIds = [
  'shipment', // Отгрузка
  'acceptance', // Приемка
  'basic', // Основное хранение
  'special', // Особые условия
  'falsification', // Фальсификат и контрафакт
  'quarantine', // Карантинное хранение
  'sampling', // Отбор образцов
] as const;
export type TBoxId = (typeof boxIds)[number];

export interface TBoxData {
  title: string;
}

export const boxes: Record<TBoxId, TBoxData> = {
  shipment: { title: 'Отгрузка' },
  acceptance: { title: 'Приемка' },
  basic: { title: 'Основное хранение' },
  special: { title: 'Особые условия' },
  falsification: { title: 'Фальсификат и контрафакт' },
  quarantine: { title: 'Карантинное хранение' },
  sampling: { title: 'Отбор образцов' },
};
