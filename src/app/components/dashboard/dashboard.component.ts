import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  CommonModule,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
} from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { PanelMenu } from 'primeng/panelmenu';
import { DiscountService } from '../../services/discount/discount.service';
import { CartService, CartItem } from '../../services/cart/cart.service';
import { ProductsService } from '../../services/products/products.service';
import { AuthService } from '../../services/auth/auth.service';
import { AdditionalProductsService } from '../../services/additional-products/additional-products';
import { pizzas, Pizza } from '../../models/edit-pizza.module';
import { workers, Worker } from '../../models/workers-dashboard.models';
import { Products } from '../../models/products.model';
import { AdditionalProducts } from '../../models/additional-products';
import { DashboardMenuBuilder } from './utils/menu-builder';
import { admin, Admin } from '../../models/admin-model';

@Component({
  selector: 'panel-menu-multiple-demo',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PanelMenu,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
  ],
})
export class PanelMenuMultipleDemo implements OnInit, OnDestroy {
  items: MenuItem[] = [];
  menuVisible = false;
  selectedSection: string = 'main';
  pizzas: Pizza[] = pizzas;
  workers: Worker[] = workers;
  admins: Admin[] = admin;
  products: Products[] = [];
  cartItems: CartItem[] = [];
  feedbacks: { text: string; date: string }[] = [];
  additionalProductsList: AdditionalProducts[] = [];
  total: number = 0;
  selectedWorker?: Worker;
  SelectedAdmins?: Admin;
  goalOrders = 1000;
  ordersToday = 15;
  ordersWeek = 80;
  ordersMonth = 1001;
  currentTab = 'popular';
  averageCheck = 350;
  bestCustomer = 'Богдан';
  bestEmployee = 'Дмитро';
  megaDiscount = '50% на другу піцу';
  megaDiscountEnd = 'до 31 грудня діє акція на третю піцу зі знижкою 60%';

  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private discountService: DiscountService,
    private cartService: CartService,
    private productsService: ProductsService,
    private authService: AuthService,
    private additionalProductsService: AdditionalProductsService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      if (window.innerWidth <= 600) {
        window.scrollTo({ top: 80, behavior: 'smooth' });
      }
    }, 10);
    this.items = DashboardMenuBuilder.buildMenu(
      this.pizzas,
      this.workers,
      this.admins,
      this.discountService,
      this,
      this.authService.getCurrentRole()
    );
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
    this.products = this.productsService.getProducts();
    this.additionalProductsList =
      this.additionalProductsService.getAdditionalProducts();
    this.loadFeedbacks();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  changeQty(id: number, qty: number) {
    this.cartService.updateQuantity(id, qty);
    this.total = this.cartService.getTotal();
  }

  remove(id: number) {
    if (!this.authService.isAdmin()) {
      alert('Лише адмін може видаляти замовлення!');
      return;
    }

    const removed = this.cartItems.find((item) => item.id === id);
    this.cartService.removeFromCart(id);
    this.total = this.cartService.getTotal();

    if (removed) {
      const user =
        this.authService.getCurrentUser()?.usernameAdmin || 'невідомий';

      const logEntry = {
        id: removed.id,
        name: removed.name,
        removedAt: new Date().toISOString(),
        removedBy: user,
        price: removed.price,
        quantity: removed.quantity,
      };

      const logs = JSON.parse(localStorage.getItem('orderRemoveLogs') || '[]');
      logs.unshift(logEntry);
      localStorage.setItem('orderRemoveLogs', JSON.stringify(logs));
    }
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }

  loadFeedbacks() {
    this.feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
  }

  removeFeedback(index: number) {
    if (!this.authService.isAdmin()) {
      alert('Лише адмін може видаляти відгуки!');
      return;
    }

    const removed = this.feedbacks.splice(index, 1)[0];
    localStorage.setItem('feedbacks', JSON.stringify(this.feedbacks));

    const user =
      this.authService.getCurrentUser()?.usernameAdmin || 'невідомий';

    const logEntry = {
      text: removed.text,
      date: removed.date,
      removedAt: new Date().toISOString(),
      removedBy: user,
    };

    const logs = JSON.parse(localStorage.getItem('feedbackLogs') || '[]');
    logs.unshift(logEntry);
    localStorage.setItem('feedbackLogs', JSON.stringify(logs));
  }

  removeFromCart(itemId: number) {
    if (!this.authService.isAdmin()) {
      alert('Лише адмін може видаляти замовлення!');
      return;
    }
    const removedItem = this.cartItems.find((item) => item.id === itemId);
    if (removedItem) {
      this.cartService.removeFromCart(itemId);
      this.total = this.cartService.getTotal();

      const user =
        this.authService.getCurrentUser()?.usernameAdmin || 'невідомий';

      const logEntry = {
        id: removedItem.id,
        name: removedItem.name,
        removedAt: new Date().toISOString(),
        removedBy: user,
        price: removedItem.price,
        quantity: removedItem.quantity,
      };

      const logs = JSON.parse(localStorage.getItem('orderRemoveLogs') || '[]');
      logs.unshift(logEntry);
      localStorage.setItem('orderRemoveLogs', JSON.stringify(logs));
    }
  }

  deleteOrderLog(index: number) {
    if (!this.authService.isAdmin()) {
      alert('Лише адмін може видаляти логи!');
      return;
    }

    const logs = this.getOrderRemoveLogs();
    logs.splice(index, 1);
    localStorage.setItem('orderRemoveLogs', JSON.stringify(logs));
  }

  getFeedbackLogs() {
    return JSON.parse(localStorage.getItem('feedbackLogs') || '[]');
  }

  deleteLog(index: number) {
    if (!this.authService.isAdmin()) {
      alert('Лише адмін може видаляти логи!');
      return;
    }

    const logs = this.getFeedbackLogs();
    logs.splice(index, 1);
    localStorage.setItem('feedbackLogs', JSON.stringify(logs));
  }

  getOrderRemoveLogs() {
    return JSON.parse(localStorage.getItem('orderRemoveLogs') || '[]');
  }

  getPizzaLogs() {
    return JSON.parse(localStorage.getItem('pizzaLogs') || '[]');
  }

  deletePizzaLog(index: number) {
    if (!this.authService.isAdmin()) {
      alert('Лише адмін може видаляти логи!');
      return;
    }
    const logs = this.getPizzaLogs();
    logs.splice(index, 1);
    localStorage.setItem('pizzaLogs', JSON.stringify(logs));
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  getStars(rating: number): string[] {
    return Array.from({ length: 5 }, (_, i) =>
      i < rating ? 'filled' : 'empty'
    );
  }

  get mostPopularPizza(): Pizza | undefined {
    return this.pizzas.reduce((max, pizza) =>
      pizza.orders > (max?.orders ?? 0) ? pizza : max
    );
  }

  goBack() {
    this.router.navigate(['/products']);
  }

  get ordersProgress(): number {
    return Math.min(
      Math.round((this.ordersMonth / this.goalOrders) * 100),
      100
    );
  }

  get ordersLeft(): number {
    return Math.max(this.goalOrders - this.ordersMonth, 0);
  }
}
