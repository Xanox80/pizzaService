import { Injectable } from '@angular/core';
import { Pizza } from '../../models/pizza.model';

@Injectable({ providedIn: 'root' })
export class PizzaService {
  private pizzas: Pizza[] = [
    {
      id: 1,
      name: 'Маргарита',
      description: 'Класична піца з томатами та моцарелою.',
      image: 'assets/images/pizzas/margarita.jpg',
      price: 169,
      category: "М'ясна 🥩",
      rating: 4.5,
    },

    {
      id: 2,
      name: 'Пепероні',
      description: 'Піца з пепероні та сиром.',
      image: 'assets/images/pizzas/peperoni.jpg',
      price: 189,
      category: "М'ясна 🥩",
      rating: 4.7,
    },
    {
      id: 3,
      name: '4 Сири',
      description: 'Піца з чотирма видами сиру.',
      image: 'assets/images/pizzas/fourchees.jpg',
      price: 199,
      category: 'Дитяча 👶',
      rating: 4.6,
    },
    {
      id: 4,
      name: 'Гавайська',
      description: 'Піца з куркою та ананасами.',
      image: 'assets/images/pizzas/gavajska.jpg',
      price: 189,
      category: "М'ясна 🥩",
      rating: 4.4,
    },
    {
      id: 5,
      name: 'Вегетаріанська',
      description: 'Піца з свіжими овочами.',
      image: 'assets/images/pizzas/vegan-pizza.jpg',
      price: 179,
      category: 'Веганська 🫑',
      rating: 4.3,
    },
    {
      id: 6,
      name: 'Гостра',
      description: 'Піца з гострим перцем та ковбасою.',
      image: 'assets/images/pizzas/spicy.jpg',
      price: 199,
      category: 'Гостра 🌶️',
      rating: 4.8,
    },
  ];

  getPizzas(): Pizza[] {
    return this.pizzas;
  }

  getPizzaById(id: number): Pizza | undefined {
    return this.pizzas.find((p) => p.id === id);
  }
}
