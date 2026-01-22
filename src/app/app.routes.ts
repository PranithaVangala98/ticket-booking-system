import { Routes } from '@angular/router';
import { Signup } from './pages/signup/signup';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { AddTrains } from './pages/add-trains/add-trains';
import { AuthGuard } from './pages/auth/auth-guard';
import { Booking } from './pages/booking/booking';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'signup', component: Signup },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  {
    path: 'admin',
    component: AddTrains,
    canActivate: [AuthGuard],
    data: { role: 'admin' },
  },
  { path: 'passenger', component: Dashboard },
  { path: 'booking/:trainId', component: Booking },
];
