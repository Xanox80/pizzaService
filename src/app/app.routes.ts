import { Routes } from '@angular/router';
import { ProductsPage } from './pages/home/home.component';
import { CartPage } from './pages/cart/cart.component';
import { CheckoutPage } from './pages/checkout/checkout.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { PizzaEditComponent } from './pages/pizza-edit/pizza-edit.component';
import { authGuard, adminGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.page';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { PanelMenuMultipleDemo } from './components/dashboard/dashboard.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { AdditionalProductsPage } from './pages/additional-products/additional-products.component';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductsPage },
  { path: 'cart', component: CartPage },
  { path: 'checkout', component: CheckoutPage },
  { path: 'thank-you', component: ThankYouComponent },
  { path: 'login', component: LoginComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'additional-products', component: AdditionalProductsPage },
  {
    path: 'dashboard',
    component: PanelMenuMultipleDemo,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'products/:id',
    component: PizzaEditComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'products/new',
    component: PizzaEditComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'feedback',
    component: FeedbackComponent,
  },
  {
    path: '**',
    component: ErrorPageComponent,
  },
];
