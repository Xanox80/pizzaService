import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutFormComponent } from '../../components/checkout-form/checkout-form.component';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule, CheckoutFormComponent],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutPage {}
