import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // available across app
})
export class Auth {
  login(username: string, password: string): string | null {
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('role', 'admin');
      return 'admin';
    }

    if (username === 'user' && password === 'user123') {
      localStorage.setItem('role', 'passenger');
      return 'passenger';
    }

    return null;
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  logout(): void {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('role');
  }
}
