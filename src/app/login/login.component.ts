import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  @Output() close = new EventEmitter<void>();
  @Output() openRegister = new EventEmitter<void>();

  constructor(private authService: AuthService, private router: Router) {}

  onClose() {
    this.close.emit();
  }

  switchToRegister() {
    this.close.emit(); // close the login modal
    this.openRegister.emit(); // notify landing component to open register modal
  }

  onLogin() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        console.log(response.role);
        console.log(response);
        this.redirectUser();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Login failed';
      },
    });
  }
  redirectUser() {
    const role = this.authService.getUserRole();
    console.log(role);
    if (role === 'Admin') {
      console.log('Admin Logged In!!!');
      this.router.navigate(['/admin']);
    } else if (role === 'User') {
      console.log('User Logged In');
      this.router.navigate(['/student']);
    } else {
      console.log('Enter correct User!!!');
    }
    // else {
    //   this.router.navigate(['/login']);
    // }
  }
}
