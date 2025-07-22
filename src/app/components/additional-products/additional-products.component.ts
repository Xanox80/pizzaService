import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AdditionalProducts } from '../../models/additional-products';
import { CartItem, CartService } from '../../services/cart/cart.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-additional-products',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './additional-products.component.html',
  styleUrls: ['./additional-products.scss'],
})
export class AdditionalProductsComponent {
  @Input() additionalProducts!: AdditionalProducts;

  constructor(private cartService: CartService) {}

  addToCart() {
    const cartItem: CartItem = {
      id: this.additionalProducts.id,
      name: this.additionalProducts.name,
      price: this.additionalProducts.price,
      quantity: 1,
      image: this.additionalProducts.image,
    };
    this.cartService.addToCart(cartItem);
  }
}
