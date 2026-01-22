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
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardSubtitle,
    MatCardContent,
    MatCardTitle,
    MatCardActions,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  username = '';
  password = '';
  role = 'passenger'; // default

  constructor(private router: Router) {}

  register() {
    if (!this.username || !this.password || !this.role) {
      alert('All fields are required');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // check duplicate user
    const exists = users.find((u: any) => u.username === this.username);
    if (exists) {
      alert('User already exists');
      return;
    }

    users.push({
      username: this.username,
      password: this.password,
      role: this.role,
    });

    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful 🎉');
    this.router.navigate(['/login']);
  }
}
