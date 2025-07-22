import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DiscountService } from '../discount/discount.service';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  private readonly CART_STORAGE_KEY = 'pizza_cart';

  constructor(private discountService: DiscountService) {
    this.loadCartFromStorage();
  }
  private loadCartFromStorage(): void {
    const storedCart = localStorage.getItem(this.CART_STORAGE_KEY);
    if (storedCart) {
      this.cartItems.next(JSON.parse(storedCart));
    }
  }

  private saveCartToStorage(items: CartItem[]): void {
    localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(items));
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartItems.asObservable();
  }

  addToCart(item: CartItem): void {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find((i) => i.id === item.id);

    if (existingItem) {
      existingItem.quantity += item.quantity;
      this.cartItems.next([...currentItems]);
    } else {
      this.cartItems.next([...currentItems, item]);
    }
    this.saveCartToStorage(this.cartItems.value);
  }

  removeFromCart(itemId: number): void {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems.filter((item) => item.id !== itemId);
    this.cartItems.next(updatedItems);
    this.saveCartToStorage(updatedItems);
  }

  updateQuantity(itemId: number, quantity: number): void {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity };
      }
      return item;
    });
    this.cartItems.next(updatedItems);
    this.saveCartToStorage(updatedItems);
  }

  getTotal() {
    let total = 0;
    const discount = this.discountService.getDiscount();
    console.log('Current discount:', discount);
    const pizzas: CartItem[] = [];
    this.cartItems.value.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        pizzas.push({ ...item, quantity: 1 });
      }
    });

    if (discount === 'secondPizza50' && pizzas.length >= 2) {
      const sorted = [...pizzas].sort((a, b) => a.price - b.price);
      total += sorted[0].price;
      total += sorted[1].price * 0.5;
      for (let i = 2; i < sorted.length; i++) {
        total += sorted[i].price;
      }
    } else if (discount === 'thirdPizza60' && pizzas.length >= 3) {
      const sorted = [...pizzas].sort((a, b) => a.price - b.price);
      total += sorted[0].price;
      total += sorted[1].price;
      total += sorted[2].price * 0.4;
      for (let i = 3; i < sorted.length; i++) {
        total += sorted[i].price;
      }
    } else {
      total = this.cartItems.value.reduce(
        (sum: number, p: CartItem) => sum + p.price * p.quantity,
        0
      );
    }
    return total;
  }
  clearCart(): void {
    this.cartItems.next([]);
    localStorage.removeItem(this.CART_STORAGE_KEY);
  }
}
