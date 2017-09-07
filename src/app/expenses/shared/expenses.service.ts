import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { FirebaseService } from '../../shared/firebase/firebase.service';

@Injectable()
export class ExpensesService {

  constructor(
    private firebaseService: FirebaseService
  ) {}

  getEmployeeById(id: string): any {
    return this.firebaseService.getObject(`/employees/${id}`);
  }

  parseExpense(expense): any {
    return Observable.combineLatest(
      this.getEmployeeById(expense.employee),
      this.getEmployeeById(expense.reviewedBy)
    ).map(employeesData => {
      let [employee, reviewedBy] = employeesData;

      return Object.assign(
        expense,
        {
          employee,
          reviewedBy,
          expenseId: expense.$key,
          eventDatetime: new Date(expense.eventDatetime),
          expenseDatetime: new Date(expense.expenseDatetime)
        }
      );
    });
  }

  getExpenses(): any {
    return this.firebaseService.getCollection('/expenses')
      .switchMap(expenses => Observable.combineLatest(
        ...expenses.map(expense => this.parseExpense(expense)))
      );
  }

}