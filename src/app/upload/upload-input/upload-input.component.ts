import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { UploadService } from '../upload.service';
import { FileState, FileStateItem } from '../upload.reducer';
import { FirebaseService } from '../../shared/firebase/firebase.service';

@Component({
  selector: 'app-upload-input',
  templateUrl: './upload-input.component.html',
  styleUrls: ['./upload-input.component.scss']
})
export class UploadInputComponent implements OnInit, OnDestroy {
  @Output() files = new EventEmitter();

  private filesSubscription: Subscription;

  hasFileOver = new BehaviorSubject<boolean>(false).distinctUntilChanged();

  constructor(
    public uploadService: UploadService,

    private store: Store<any>,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.filesSubscription = this.store.select('file')
      .map((files: FileState) =>
        Object.values(files).map(file => ({
          src: file.src,
          name: file.file.name
        }))
      )
      .filter((files) => files.every(file => file.src !== '#'))
      .do(files => this.files.next(files))
      .subscribe();
  }

  ngOnDestroy() {
    this.filesSubscription.unsubscribe();
  }
}
