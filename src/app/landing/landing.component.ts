import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
})
export class LandingComponent implements OnInit{
  
  registerForm!:FormGroup;
  isRegisterModalOpen=false;
  registerError:string | null=null;
  isLoginModalOpen = false;
  isTrainerModalOpen = false;

  constructor(private router : Router,private fb: FormBuilder,private authService:AuthService){}

   ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatchValidator });
  }

   // cross-field validator returning an object on mismatch (group-level)
  passwordsMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return (password && confirm && password !== confirm) ? { passwordMismatch: true } : null;
  };

  openLoginModal() {
    this.isLoginModalOpen = true;
    this.router.navigate(['/login']);
  }

  openRegisterModal() {
    this.isRegisterModalOpen = true;
  }

  openTrainerModal() {
    this.isTrainerModalOpen = true;
  }

  closeModal(modalId: string) {
    if (modalId === 'loginModal') {
      this.isLoginModalOpen = false;
    } else if (modalId === 'registerModal') {
      this.isRegisterModalOpen = false;
    } else if (modalId === 'trainerModal') {
      this.isTrainerModalOpen = false;
    }
  }

   onRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const v = this.registerForm.value;
    const payload = {
      firstName: v.firstName,
      lastName: v.lastName,
      email: v.email,
      password: v.password,
      roleId: 2 // student role
    };

    this.authService.register(payload).subscribe({
      next: (res) => {
        // optional: save token if you want
        // this.authService.saveToken?.(res.token);
        this.registerError = null;
        alert('Registration successful!');
        this.closeModal('registerModal');
      },
      error: (err) => {
        console.error(err);
        this.registerError = err.error?.message || 'Registration failed';
      }
    });
  }
  
}
