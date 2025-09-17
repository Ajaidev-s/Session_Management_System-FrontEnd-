import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],
})
export class Admin {
  sidebarOpen: boolean = false;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth > 768) {
      this.sidebarOpen = false;
    }
  }

  // Close sidebar on mobile if clicked outside
  closeSidebarOnOutsideClick(event: Event) {
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.querySelector('.mobile-menu-btn');

    if (
      window.innerWidth <= 768 &&
      sidebar &&
      menuBtn &&
      !sidebar.contains(event.target as Node) &&
      !menuBtn.contains(event.target as Node)
    ) {
      this.sidebarOpen = false;
    }
  }
}
