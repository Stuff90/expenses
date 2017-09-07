import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, toPayload } from '@ngrx/effects';

import { SAVE_EXPENSE } from "./expenses.actions";
import { FirebaseService } from "../../shared/firebase/firebase.service";

@Injectable()
export class ExpensesEffects {

  @Effect({ dispatch: false }) onExpensesFormSubmitted: Observable<any> = this.actions
    .ofType(SAVE_EXPENSE)
    .switchMapTo(this.store.select('expenses'))
    .map(expensesState => expensesState.form.data)
    .do((expense: any) => this.firebaseService.setEntity('/expenses', expense));

  constructor(
    private actions: Actions,
    private store: Store<any>,
    private firebaseService: FirebaseService,
  ) { }

}
