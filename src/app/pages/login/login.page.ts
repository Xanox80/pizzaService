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
  verificationCode: string = '';
  error: string = '';
  show2FA: boolean = false;
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
    const result = this.authService.login(this.username, this.password);

    if (result === 'success') {
      this.router.navigateByUrl(this.returnUrl);
    } else if (result === '2fa') {
      this.show2FA = true;
    } else if (result === 'locked') {
      this.error = 'Акаунт тимчасово заблокований. Спробуйте пізніше.';
    } else {
      this.error = 'Невірний логін або пароль';
    }
  }

  verifyCode() {
    if (this.authService.verify2FA(this.verificationCode)) {
      this.router.navigateByUrl(this.returnUrl);
    } else {
      this.error = 'Невірний код підтвердження';
    }
  }
}
