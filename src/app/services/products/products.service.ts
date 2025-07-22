import { Injectable } from '@angular/core';
import { Products } from '../../models/products.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private products: Products[] = [
    {
      id: 1,
      name: 'Огірок',
      description: 'Свіжі огірки, вирощені на місцевих фермах.',
      image: 'assets/images/products/ogirok.jpg',
      price: 20,
      category: 'Овочі 🥒',
    },
    {
      id: 2,
      name: 'Помідор',
      description: 'Соковиті помідори, ідеальні для салатів.',
      image: 'assets/images/products/pomidor.jpg',
      price: 25,
      category: 'Овочі 🍅',
    },
    {
      id: 3,
      name: 'Базилік',
      description: 'Ароматний базилік, чудовий для піци та пасти.',
      image: 'assets/images/products/zelen.jpeg',
      price: 15,
      category: 'Зелень 🌿',
    },
    {
      id: 4,
      name: 'Перець',
      description: 'Солодкий перець різних кольорів.',
      image: 'assets/images/products/perec.jpg',
      price: 30,
      category: 'Овочі 🌶️',
    },
    {
      id: 5,
      name: 'Цибуля',
      description: 'Свіжа цибуля, ідеальна для приготування страв.',
      image: 'assets/images/products/onion.jpg',
      price: 10,
      category: 'Овочі 🧅',
    },
  ];

  getProducts(): Products[] {
    return this.products;
  }
}
