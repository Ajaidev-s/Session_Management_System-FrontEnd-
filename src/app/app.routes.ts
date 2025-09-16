import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { LoginComponent } from './login/login.component';


export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'student', component: StudentDashboardComponent },
    {path:'login',component:LoginComponent}
];
