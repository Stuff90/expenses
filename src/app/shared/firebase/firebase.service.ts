import { UUID } from 'angular2-uuid';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FileItem } from 'ng2-file-upload';

@Injectable()
export class FirebaseService {

  constructor(
    private db: AngularFireDatabase,
  ) {}

  getEmployees(queryParams: any = {}): any {
    return this.getCollection('/employee', queryParams);
  }

  getCollection(path: string, queryParams: any = {}): any {
    return this.db.list(path, queryParams);
  }

  setEntity(path: string, entity: any): any {
    return this.db.list(path)
      .set(UUID.UUID(), entity)
  }

}