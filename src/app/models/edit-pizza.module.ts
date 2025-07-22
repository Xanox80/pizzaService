export interface Pizza {
  id: number;
  name: string;
  orders: number;
}
export const pizzas: Pizza[] = [
  { id: 1, name: 'Маргарита', orders: 12 },
  { id: 2, name: 'Пепероні', orders: 20 },
  { id: 3, name: 'Гавайська', orders: 7 },
  { id: 4, name: 'Чотири сири', orders: 15 },
  { id: 5, name: 'Мексиканська', orders: 10 },
  { id: 6, name: 'Вегетаріанська', orders: 5 },
  { id: 7, name: 'Барбекю', orders: 8 },
  { id: 8, name: 'Карбонара', orders: 6 },
  { id: 9, name: 'Песто', orders: 4 },
  { id: 10, name: 'Салямі', orders: 3 },
];
