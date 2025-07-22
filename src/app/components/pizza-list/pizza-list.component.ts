import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaItemComponent } from '../pizza-item/pizza-item.component';
import { Pizza } from '../../models/pizza.model';
import { PizzaService } from '../../services/pizza/pizza.service';

@Component({
  selector: 'app-pizza-list',
  standalone: true,
  imports: [CommonModule, PizzaItemComponent],
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.scss'],
})
export class PizzaListComponent implements OnInit {
  pizzas: Pizza[] = [];
  filteredPizzas: Pizza[] = [];
  categories = ['Усі', "М'ясна 🥩", 'Гостра 🌶️', 'Веганська 🫑', 'Дитяча 👶'];
  selectedCategory = 'Усі';
  sort: 'price' | 'rating' = 'price';
  sortDir: 'asc' | 'desc' = 'asc';

  constructor(private pizzaService: PizzaService) {}

  ngOnInit() {
    this.pizzas = this.pizzaService.getPizzas();
    this.applyFilters();
  }

  setCategory(cat: string) {
    this.selectedCategory = cat;
    this.applyFilters();
  }

  setSort(sort: 'price' | 'rating', dir?: 'asc' | 'desc') {
    if (this.sort === sort) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sort = sort;
      this.sortDir = dir || 'asc';
    }
    this.applyFilters();
  }

  applyFilters() {
    const categoryFiltered =
      this.selectedCategory === 'Усі'
        ? this.pizzas
        : this.pizzas.filter((p) => p.category === this.selectedCategory);

    const key = this.sort;
    const direction = this.sortDir === 'asc' ? 1 : -1;

    this.filteredPizzas = [...categoryFiltered].sort(
      (a, b) => (a[key] > b[key] ? 1 : -1) * direction
    );
  }
}
