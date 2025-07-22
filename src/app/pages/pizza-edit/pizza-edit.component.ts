import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pizza } from '../../models/pizza.model';
import { PizzaService } from '../../services/pizza/pizza.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-pizza-edit',
  templateUrl: './pizza-edit.component.html',
  styleUrls: ['./pizza-edit.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class PizzaEditComponent implements OnInit {
  pizza: Pizza = {
    id: 0,
    name: '',
    description: '',
    image: '',
    price: 0,
    category: '',
    rating: 0,
  };
  isNewPizza: boolean = true;

  constructor(
    private pizzaService: PizzaService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const pizza = this.pizzaService.getPizzaById(+id);
      if (pizza) {
        this.pizza = { ...pizza };
        this.isNewPizza = false;
      }
    }
  }

  onSubmit() {
    const now = new Date().toISOString();
    const user =
      this.authService['currentUser'].value?.usernameAdmin || 'невідомий';

    if (this.isNewPizza) {
      this.pizza.id =
        Math.max(...this.pizzaService.getPizzas().map((p) => p.id)) + 1;
      this.pizzaService.getPizzas().push(this.pizza);

      this.logPizzaAction('створив(ла)', user, now);
    } else {
      const index = this.pizzaService
        .getPizzas()
        .findIndex((p) => p.id === this.pizza.id);
      if (index !== -1) {
        this.pizzaService.getPizzas()[index] = { ...this.pizza };
        this.logPizzaAction('редагував(ла)', user, now);
      }
    }

    this.router.navigate(['/products']);
  }
  logPizzaAction(action: string, user: string, timestamp: string) {
    const logs = JSON.parse(localStorage.getItem('pizzaLogs') || '[]');
    logs.unshift({
      action,
      name: this.pizza.name,
      time: timestamp,
      user,
    });
    localStorage.setItem('pizzaLogs', JSON.stringify(logs));
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
