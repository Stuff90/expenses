import { UUID } from 'angular2-uuid';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class FirebaseService {

  constructor(
    private db: AngularFireDatabase,
  ) {}

  getCollection(path: string, queryParams: any = {}) {
    return this.db.list(path, queryParams);
  }

  setEntity(path: string, entity: any) {
    return this.db.list(path)
      .set(UUID.UUID(), entity)
  }

}