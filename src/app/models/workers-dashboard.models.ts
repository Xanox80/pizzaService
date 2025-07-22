export interface Worker {
  id: number;
  name: string;
  position: string;
  rating?: number;
}
export const workers: Worker[] = [
  { id: 1, name: 'Іван', position: 'Піца-мейкер', rating: 3.5 },
  { id: 2, name: 'Марія', position: 'Офіціант', rating: 4.7 },
  { id: 3, name: 'Олексій', position: 'Кухар', rating: 4.8 },
  { id: 4, name: 'Анна', position: 'Менеджер', rating: 4.6 },
  { id: 5, name: 'Сергій', position: 'Доставщик', rating: 4.9 },
];
