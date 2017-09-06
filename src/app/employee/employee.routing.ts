import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './pages/employees/employees.component';

export const employeeRoutes: Routes = [
  { path: 'employees',  component: EmployeesComponent },
];
