import { Component } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  isLoginModalOpen = false;
  isRegisterModalOpen = false;
  isTrainerModalOpen = false;

  constructor(private router : Router){}

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
}
