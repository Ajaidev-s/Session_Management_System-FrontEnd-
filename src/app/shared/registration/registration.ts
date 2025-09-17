import { Component, EventEmitter, Input, Output, OnInit ,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ToastComponent} from '../toast/toast';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.html',
  styleUrls: ['./registration.css'],
  standalone: true, // This is needed for standalone components
  imports: [ReactiveFormsModule, CommonModule, ToastComponent]
})
export class Registration implements OnInit {
  @ViewChild(ToastComponent) toast!: ToastComponent;
  @Input() isOpen: boolean = false;
  @Input() roleId: number = 2; // Default to student role
  @Output() closed = new EventEmitter<void>();
  @Output() registrationSuccess = new EventEmitter<void>();

  registerForm!: FormGroup;
  registerError: string | null = null;
  isLoading: boolean = false; // ✅ ADDED: Loading state for form submission

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

    // ✅ ADDED: Set loading state to true when starting registration
    this.isLoading = true;
    this.registerError = null; // Clear any previous errors

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
        this.isLoading = false; // ✅ ADDED: Reset loading state on success
        this.registerError = null;
        this.registrationSuccess.emit();
        this.onClose();
        // alert('Registration successful!');
        //Show success toast
        this.toast.message = 'User registration successful 🎉';
        this.toast.type = 'success';
        this.toast.show = true;
        this.toast.hideAfterDelay();
      },
      error: (err) => {
        this.isLoading = false; // ✅ ADDED: Reset loading state on error
        console.error(err);
        this.registerError = err.error?.message || 'Registration failed. Please try again.'; // ✅ IMPROVED: Better error message
      }
    });
  }

  onClose() {
    this.registerForm.reset();
    this.registerError = null;
    this.isLoading = false; // ✅ ADDED: Reset loading state when closing modal
    this.closed.emit();
  }

  // ✅ ADDED: Helper method to check if a form field has errors
  hasFieldError(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }
  

  // ✅ ADDED: Helper method to get field error message
  getFieldErrorMessage(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) {
      switch (fieldName) {
        case 'firstName': return 'First name is required (minimum 2 characters)';
        case 'lastName': return 'Last name is required';
        case 'email': return 'Email address is required';
        case 'password': return 'Password is required';
        case 'confirmPassword': return 'Please confirm your password';
        default: return 'This field is required';
      }
    }

    if (field.errors['minlength']) {
      if (fieldName === 'firstName') return 'First name must be at least 2 characters long';
      if (fieldName === 'password') return 'Password must be at least 6 characters long';
    }

    if (field.errors['email']) return 'Please enter a valid email address';

    return 'Invalid input';
  }

  
}