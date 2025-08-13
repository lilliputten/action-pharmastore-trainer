import { TBoxId } from './boxes';

export interface TCardData {
  text: string;
  box: TBoxId;
}

export const cards: TCardData[] = [
  { text: 'Партия антибиотиков со сроком годности 07.2025', box: 'quarantine' },
  { text: 'Вакцина против гриппа, требуется хранение при +2…+8°C', box: 'special' },
  { text: 'Коробка с обезболивающими, где стёрты Data Matrix коды', box: 'falsification' },
  {
    text: 'Препараты, готовые к отправке в аптеку, упакованы, документы подписаны',
    box: 'shipment',
  },
  { text: 'Партия таблеток с уведомлением ГИС МДЛП: «Оборот приостановлен»', box: 'quarantine' },
  { text: 'Лекарства, поступившие от поставщика без транспортной накладной', box: 'quarantine' },
  { text: 'Образцы для лабораторного анализа, 5 упаковок из партии', box: 'sampling' },
  { text: 'Препараты с нарушенной герметичностью упаковки', box: 'quarantine' },
  { text: 'Партия инсулина, которую только что приняли по накладной', box: 'acceptance' },
  { text: 'Лекарства с остатком срока годности 7 дней', box: 'basic' },
  { text: 'Препараты с Data Matrix кодом, который не читается сканером', box: 'quarantine' },
];
