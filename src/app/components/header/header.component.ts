import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart/cart.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatBadgeModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  cartItemsCount: number = 0;
  feedbackText = '';
  feedbackSuccess = false;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
    });
  }

  goToFeedback() {
    this.router.navigate(['/feedback']);
  }
  gotoAdds() {
    this.router.navigate(['/additional-products']);
  }
}
