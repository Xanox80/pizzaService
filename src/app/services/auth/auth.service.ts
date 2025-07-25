import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user.model';

interface LoginAttempt {
  attempts: number;
  lockedUntil: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser = new BehaviorSubject<User | null>(null);
  private loginAttempts: { [username: string]: LoginAttempt } = {};
  private pending2FAUser: User | null = null;

  private readonly MAX_ATTEMPTS = 3;
  private readonly LOCK_TIME_MS = 5 * 60 * 1000; // 5 хв

  private readonly MOCK_USERS: User[] = [
    {
      id: 1,
      usernameAdmin: 'bogdanservetnik80@gmail.com',
      password: '11111111',
      role: 'admin',
    },
    {
      id: 2,
      usernameAdmin: 'admin2@example.com',
      password: '22222222',
      role: 'admin',
    },
    {
      id: 3,
      usernameAdmin: 'kuharchuk@gmail.com',
      password: '33333333',
      role: 'cook',
    },
    {
      id: 4,
      usernameAdmin: 'kladovik@gmail.com',
      password: '44444444',
      role: 'warehouse',
    },
  ];

  constructor() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser.next(JSON.parse(storedUser));
    }
  }

  login(
    username: string,
    password: string
  ): 'success' | '2fa' | 'locked' | 'error' {
    const now = Date.now();

    const attempt = this.loginAttempts[username];
    if (attempt?.lockedUntil && now < attempt.lockedUntil) {
      return 'locked';
    }

    const user = this.MOCK_USERS.find(
      (u) => u.usernameAdmin === username && u.password === password
    );

    if (user) {
      this.loginAttempts[username] = { attempts: 0, lockedUntil: null };

      if (user.role === 'admin') {
        this.pending2FAUser = user;
        return '2fa';
      }

      this.currentUser.next(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return 'success';
    } else {
      if (!this.loginAttempts[username]) {
        this.loginAttempts[username] = { attempts: 1, lockedUntil: null };
      } else {
        this.loginAttempts[username].attempts++;
        if (this.loginAttempts[username].attempts >= this.MAX_ATTEMPTS) {
          this.loginAttempts[username].lockedUntil = now + this.LOCK_TIME_MS;
        }
      }
      return 'error';
    }
  }

  verify2FA(code: string): boolean {
    if (this.pending2FAUser && code === '123456') {
      this.currentUser.next(this.pending2FAUser);
      localStorage.setItem('currentUser', JSON.stringify(this.pending2FAUser));
      this.pending2FAUser = null;
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    return this.currentUser.value !== null;
  }

  isAdmin(): boolean {
    return (
      this.currentUser.value?.role === 'admin' ||
      this.currentUser.value?.role === 'cook' ||
      this.currentUser.value?.role === 'warehouse'
    );
  }

  getCurrentUser(): User | null {
    return this.currentUser.value;
  }

  logout(): void {
    this.currentUser.next(null);
    localStorage.removeItem('currentUser');
  }

  getCurrentRole(): 'admin' | 'cook' | 'warehouse' | 'user' {
    return this.currentUser.value?.role ?? 'user';
  }
}
