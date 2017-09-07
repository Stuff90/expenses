import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './pages/employees/employees.component';
import { EmployeesEditionComponent } from './pages/employees-edition/employees-edition.component';

export const employeeRoutes: Routes = [
  { path: 'employees',  component: EmployeesComponent },
  { path: 'employees/form',  component: EmployeesEditionComponent },
];
