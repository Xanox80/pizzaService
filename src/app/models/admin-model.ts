export interface Admin {
  id: string;
  name: string;
  surname: string;
  age: number;
  email: string;
  phone: string;
}
export const admin: Admin[] = [
  {
    id: '1',
    name: 'Богдан',
    surname: 'Іванов',
    age: 25,
    email: '',
    phone: '+380123456789',
  },
  {
    id: '2',
    name: 'Дмитро',
    surname: 'Петренко',
    age: 30,
    email: '',
    phone: '+380987654321',
  },
  {
    id: '3',
    name: 'Олександр',
    surname: 'Коваленко',
    age: 28,
    email: '',
    phone: '+380112233445',
  },
];
