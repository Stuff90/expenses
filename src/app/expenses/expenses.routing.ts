import { RouterModule, Routes } from '@angular/router';
import { ExpensesComponent } from './pages/expenses/expenses.component';


export const expensesRoutes: Routes = [
  { path: 'expenses',  component: ExpensesComponent },
];
