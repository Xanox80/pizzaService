import { Injectable } from '@angular/core';
import { Admin } from '../../models/admin-model';

@Injectable({ providedIn: 'root' })
export class PersonalService {
  public admin: Admin[] = [
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
  getPersonal(): Admin[] {
    return this.admin;
  }
}
