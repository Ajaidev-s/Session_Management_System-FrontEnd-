import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.html',
  styleUrls: ['./registration.css'],
  standalone: true, // This is needed for standalone components
  imports:[ReactiveFormsModule,CommonModule]

})
export class Registration implements OnInit {
  @Input() isOpen: boolean = false;
  @Input() roleId: number = 2; // Default to student role
  @Output() closed = new EventEmitter<void>();
  @Output() registrationSuccess = new EventEmitter<void>();

  registerForm!: FormGroup;
  registerError: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatchValidator });
  }

  passwordsMatchValidator: ValidatorFn = (group: AbstractControl) => {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return (password && confirm && password !== confirm) ? { passwordMismatch: true } : null;
  };

  onRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const formValue = this.registerForm.value;
    const payload = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      password: formValue.password,
      roleId: this.roleId
    };

    this.authService.register(payload).subscribe({
      next: (res) => {
        this.registerError = null;
        this.registrationSuccess.emit();
        this.onClose();
        alert('Registration successful!');
      },
      error: (err) => {
        console.error(err);
        this.registerError = err.error?.message || 'Registration failed';
      }
    });
  }

  onClose() {
    this.registerForm.reset();
    this.registerError = null;
    this.closed.emit();
  }
}