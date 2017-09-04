import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';

export const appRoutes: Routes = [
  { path: '**', redirectTo: '' }
];
