import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';
  returnUrl: string = '/products';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'] || '/products';
  }

  onSubmit() {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigateByUrl(this.returnUrl);
    } else {
      this.error = 'Невірний логін або пароль';
    }
  }
}
