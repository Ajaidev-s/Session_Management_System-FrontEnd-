import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css'],
  imports: [RouterOutlet]
})
export class StudentDashboardComponent {

  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.classList.toggle('open', this.isSidebarOpen);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    if (window.innerWidth <= 768 && sidebar && menuBtn && !sidebar.contains(event.target as Node) && !menuBtn.contains(event.target as Node)) {
      this.isSidebarOpen = false;
      sidebar.classList.remove('open');
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth > 768 && sidebar) {
      this.isSidebarOpen = false;
      sidebar.classList.remove('open');
    }
  }
}
