import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DiscountService } from '../../services/discount/discount.service';
import { Subscription } from 'rxjs';
import { CartItem, CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  total: number = 0;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private cartService: CartService,
    private router: Router,
    private discountService: DiscountService
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.cartService.getCartItems().subscribe((items) => {
        this.cartItems = items;
        this.total = this.cartService.getTotal();
      })
    );
    this.subscriptions.add(
      this.discountService.onDiscountChange().subscribe(() => {
        this.total = this.cartService.getTotal();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  remove(id: number) {
    const currentUser = JSON.parse(
      localStorage.getItem('currentUser') || 'null'
    );
    if (currentUser?.role === 'admin') {
      this.logProductRemoval(id, currentUser.usernameAdmin);
    }
    this.cartService.removeFromCart(id);
  }

  logProductRemoval(productId: number, admin: string) {
    const logEntry = {
      productId: productId,
      removedAt: new Date().toISOString(),
      removedBy: admin,
    };

    const logs = JSON.parse(localStorage.getItem('productRemovalLogs') || '[]');
    logs.unshift(logEntry);
    localStorage.setItem('productRemovalLogs', JSON.stringify(logs));
  }

  getRemovalLogs() {
    return JSON.parse(localStorage.getItem('productRemovalLogs') || '[]');
  }

  changeQty(id: number, qty: number) {
    this.cartService.updateQuantity(id, qty);
    this.total = this.cartService.getTotal();
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }

  productsPage() {
    this.router.navigate(['/products']);
  }
}
