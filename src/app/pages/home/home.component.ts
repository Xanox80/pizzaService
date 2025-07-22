import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaListComponent } from '../../components/pizza-list/pizza-list.component';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, PizzaListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class ProductsPage {}
