import { Action } from '@ngrx/store';

export const EXPENSE_UPDATE = '[Expense] Updated';
export const SAVE_EXPENSE = '[Expense] Save Data';

export class ExpenseUpdateAction implements Action {
  readonly type = EXPENSE_UPDATE;
  constructor(public payload: any) {}
}

export class ExpenseSaveAction implements Action {
  readonly type = SAVE_EXPENSE;
}

export type ExpensesActions = ExpenseUpdateAction | ExpenseSaveAction;
