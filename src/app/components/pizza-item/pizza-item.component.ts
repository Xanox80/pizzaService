import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pizza } from '../../models/pizza.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CartItem, CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-pizza-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './pizza-item.component.html',
  styleUrls: ['./pizza-item.component.scss'],
})
export class PizzaItemComponent implements OnInit {
  @Input() pizza!: Pizza;
  showRatingPrompt = false;
  showAdvice = false;
  currentAdvice = '';
  private adviceMessages = [
    'Не забувайте посміхатися 🎉',
    'Справжня піца — та, що з друзями 🍕',
    'Краще з’їсти піцу, ніж її фоткати 😄',
    'День без піци — день втрачений 🙃',
    'Посмішка — найкраща приправа до піци 😋',
    'Піца — це завжди гарна ідея! 🍕',
    'Піца — це не просто їжа, це мистецтво! 🍕🎨',
    'Піца — це любов з першого шматочка ❤️',
    'Піца — це як обійми, тільки смачніші! 🍕🤗',
    'Піца — це завжди гарний настрій! 🍕😊',
    'Піца — це не просто їжа, це емоції! 🍕❤️',
    'Піца — це як обійми, тільки смачніші! 🍕🤗',
  ];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    const shown = sessionStorage.getItem('adviceShown');
    if (!shown) {
      this.showAdvice = true;
      sessionStorage.setItem('adviceShown', 'true');
      this.currentAdvice = this.getRandomAdvice();
    }
  }

  getRandomAdvice(): string {
    const randomIndex = Math.floor(Math.random() * this.adviceMessages.length);
    return this.adviceMessages[randomIndex];
  }

  addToCart() {
    const cartItem: CartItem = {
      id: this.pizza.id,
      name: this.pizza.name,
      price: this.pizza.price,
      quantity: 1,
      image: this.pizza.image,
    };
    this.cartService.addToCart(cartItem);

    let addCount = Number(localStorage.getItem('addCount')) || 0;
    addCount++;
    localStorage.setItem('addCount', addCount.toString());

    if (addCount % 10 === 0) {
      this.showRatingPrompt = true;
    }
  }

  closeRatingPrompt() {
    this.showRatingPrompt = false;
  }

  closeAdvice() {
    this.showAdvice = false;
  }
}
