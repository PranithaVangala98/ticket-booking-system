import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Auth } from './auth';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: Auth,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role']; // admin / passenger
    const userRole = this.authService.getRole(); // from sessionStorage

    if (userRole === expectedRole) {
      return true;
    }

    // If role doesn't match → redirect to login
    this.router.navigate(['/login']);
    return false;
  }
}
