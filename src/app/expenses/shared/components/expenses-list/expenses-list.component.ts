import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

import { ExpensesService } from '../../expenses.service';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit {
  expenses: Observable<any>;

  constructor(
    private expensesService: ExpensesService
  ) {
    this.expenses = this.expensesService.getExpenses();
  }

  ngOnInit() {
  }

  getReadableTime(date: Date): string {
    return `${date.toDateString()}`;
  }

}
