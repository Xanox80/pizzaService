import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser = new BehaviorSubject<User | null>(null);

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

  login(username: string, password: string): boolean {
    const user = this.MOCK_USERS.find(
      (u) => u.usernameAdmin === username && u.password === password
    );

    if (user) {
      this.currentUser.next(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
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
