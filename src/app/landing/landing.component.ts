import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Registration} from '../shared/registration/registration';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  imports: [ CommonModule,Registration],
})
export class LandingComponent {
  
  
  isRegistrationModalOpen=true;
  isLoginModalOpen = false;
  registrationRoleId=2;

  constructor(private router : Router){}

  openLoginModal() {
    this.isLoginModalOpen = true;
    this.router.navigate(['/login']);
  }

 
  openStudentRegistration() {
    this.registrationRoleId = 2; // Student role
    this.isRegistrationModalOpen = true;
  }

  openTrainerRegistration() {
    this.registrationRoleId = 3; // Trainer role (assuming 3 is trainer, adjust as needed)
    this.isRegistrationModalOpen = true;
  }

  closeRegistrationModal() {
    this.isRegistrationModalOpen = false;
  }

  onRegistrationSuccess() {
    // Handle successful registration if needed
    console.log('Registration successful');
  }

  closeModal(modalId: string) {
    if (modalId === 'loginModal') {
      this.isLoginModalOpen = false;
    }
  }

   
}
