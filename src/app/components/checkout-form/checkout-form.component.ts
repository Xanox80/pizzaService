import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-checkout-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss'],
})
export class CheckoutFormComponent {
  order: any = {};
  submitted = false;
  formInvalid = false;

  constructor(private cart: CartService, private router: Router) {}

  submit(form: NgForm) {
    if (form.invalid) {
      this.formInvalid = true;
      Object.values(form.controls).forEach((control) =>
        control.markAsTouched()
      );
      return;
    }
    this.formInvalid = false;
    this.submitted = true;
    this.cart.clearCart();
    setTimeout(() => this.router.navigate(['/thank-you']), 2200);
  }
}
