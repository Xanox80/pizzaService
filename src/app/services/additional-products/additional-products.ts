import { Injectable } from '@angular/core';
import { AdditionalProducts } from '../../models/additional-products';

@Injectable({ providedIn: 'root' })
export class AdditionalProductsService {
  private additionalProducts: AdditionalProducts[] = [
    {
      id: 1,
      name: 'Томатний соус',
      description: 'Класичний томатний соус з італійськими спеціями.',
      image: 'assets/images/additionalproducts/tomato.jpg',
      price: 15,
    },
    {
      id: 2,
      name: 'Часниковий соус',
      description: 'Ароматний часниковий соус, який доповнить вашу піцу.',
      image: 'assets/images/additionalproducts/garlic.jpg',
      price: 20,
    },
    {
      id: 3,
      name: 'Соус BBQ',
      description: 'Солодко-гострий BBQ соус для м’ясних піц.',
      image: 'assets/images/additionalproducts/BBQ.jpg',
      price: 25,
    },
    {
      id: 5,
      name: 'Coca-Cola',
      description: 'Освіжаючий напій, який ідеально доповнить вашу піцу.',
      image: 'assets/images/additionalproducts/cola.jpg',
      price: 10,
    },

    {
      id: 7,
      name: 'Sprite',
      description: 'Легкий і освіжаючий напій з цитрусовим смаком.',
      image: 'assets/images/additionalproducts/sprite.jpg',
      price: 10,
    },
  ];

  getAdditionalProducts(): AdditionalProducts[] {
    return this.additionalProducts;
  }
}
