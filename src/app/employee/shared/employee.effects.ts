import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, toPayload } from '@ngrx/effects';

import { EMPLOYEE_FORM_SUBMIT, EmmployeeFormSubmitAction, EMPLOYEE_FORM_RESET } from './employee.actions';
import { EmployeeState } from './interfaces/employeeState.interface';
import { Employee } from './interfaces/employee.interface';
import { FirebaseService } from "../../shared/firebase/firebase.service";

@Injectable()
export class EmployeeEffects {

  @Effect({ dispatch: false }) onEmployeeFormSubmitted: Observable<any> = this.actions
    .ofType(EMPLOYEE_FORM_SUBMIT)
    .switchMapTo(this.store.select('employee'))
    .map((employeeState: EmployeeState) => employeeState.form.data)
    .filter((validEmplyee: Employee) => Object.values(validEmplyee).every(value => value !== null))
    .distinct()
    .do((emplyee: Employee) => this.firebaseService.setEntity('/employees', emplyee));

  constructor(
    private actions: Actions,
    private store: Store<any>,
    private firebaseService: FirebaseService,
  ) { }

}
