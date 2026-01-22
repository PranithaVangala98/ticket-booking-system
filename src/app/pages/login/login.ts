import { Component } from '@angular/core';
import {
  MatCardModule,
  MatCard,
  MatCardHeader,
  MatCardSubtitle,
  MatCardContent,
  MatCardTitle,
  MatCardActions,
} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../auth/auth';

@Component({
  selector: 'app-login',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardSubtitle,
    MatCardContent,
    MatCardTitle,
    // MatCardActions,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm!: FormGroup;
  constructor(
    private router: Router,
    private auth: Auth,
    private fb: FormBuilder,
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit() {
    const { username, password } = this.loginForm.value;
    const role = this.auth.login(username, password!);

    console.log('username', role);
    console.log('password', password);
    if (role === 'admin') this.router.navigate(['/admin']);
    else if (role === 'passenger') this.router.navigate(['/passenger']);
    else alert('Invalid credentials');
  }
  navigateToSignupPage() {
    this.router.navigate(['/signup']);
  }
}
