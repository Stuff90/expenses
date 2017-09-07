import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, toPayload } from '@ngrx/effects';

import { FILE_UPDATE } from './upload.actions';
import { FirebaseService } from '../shared/firebase/firebase.service';

@Injectable()
export class FileEffects {

  @Effect({ dispatch: false }) onFileAdded: Observable<any> = this.actions
    .ofType(FILE_UPDATE)

  constructor(
    private actions: Actions,
    private store: Store<any>,
    private firebaseService: FirebaseService
  ) { }

}
