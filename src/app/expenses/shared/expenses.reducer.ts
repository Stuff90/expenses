import { Action } from '@ngrx/store';

import { Expense } from './interfaces/expense.interface';
import { ExpensesActions, EXPENSE_UPDATE } from './expenses.actions';

interface ExpensesState {
  form: {
    data: Expense | null;
  },
  list: Expense[];
}

export function expensesReducer(state: ExpensesState = {
  list: [],
  form: {
    data: null
  },
}, action: ExpensesActions) {
	switch (action.type) {
    case EXPENSE_UPDATE:
      return Object.assign({}, state, {
        list: state.list,
        form: {
          data: action.payload
        }
      });

		default:
			return state;
	}
}