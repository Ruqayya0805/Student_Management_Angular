import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { AddStudentComponent } from './components/add-student/add-student';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'add-student', component: AddStudentComponent }
];