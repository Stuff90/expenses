import { RouterModule, Routes } from '@angular/router';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { ExpenseDetailsComponent } from './pages/expense-details/expense-details.component';
import { ExpensesEditionComponent } from './pages/expenses-edition/expenses-edition.component';


export const expensesRoutes: Routes = [
  { path: 'expenses',  component: ExpensesComponent },
  { path: 'expenses/details/:id',  component: ExpenseDetailsComponent },
  { path: 'expenses/form',  component: ExpensesEditionComponent },
  { path: 'expenses/form/:id',  component: ExpensesEditionComponent },
];
