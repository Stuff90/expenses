import { Action } from '@ngrx/store';
import { Employee } from "./interfaces/employee.interface";

export const EMPLOYEE_FORM_RESET = '[Employee] Form reseted';
export const EMPLOYEE_FORM_UPDATE = '[Employee] Form updated';
export const EMPLOYEE_FORM_SUBMIT = '[Employee] Form submitted';

export class EmmployeeFormUpdateAction implements Action {
  readonly type = EMPLOYEE_FORM_UPDATE;
  constructor(public payload: Employee) {}
}

export class EmmployeeFormSubmitAction implements Action {
  readonly type = EMPLOYEE_FORM_RESET;
  constructor(public payload: boolean) {}
}

export class EmmployeeFormResetAction implements Action {
  readonly type = EMPLOYEE_FORM_SUBMIT;
  constructor(public payload: boolean) {}
}

export type EmployeeActions =
  EmmployeeFormUpdateAction
  | EmmployeeFormResetAction
  | EmmployeeFormSubmitAction;
