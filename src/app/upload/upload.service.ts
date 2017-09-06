import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { FileItem } from 'ng2-file-upload';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { FILE_UPDATE, FILE_UPLOADED } from './upload.actions';
import { FirebaseService } from '../shared/firebase/firebase.service';

@Injectable()
export class UploadService {
  uploader: FileUploader = new FileUploader({url: ''});

  file = new Subject<FileItem>();

  constructor(
    private store: Store<any>,
    private firebaseService: FirebaseService
  ) {
    this.uploader.onAfterAddingFile = (file: FileItem) => this.file.next(file);

    this.file
      .map((fileItem: FileItem) => fileItem._file)
      .do(file => this.upload(file))
      .do((file: File) => this.store.dispatch({
        type: FILE_UPDATE,
        payload: { file, name: file.name }
      }))
      .subscribe()
  }


  private upload(file: File) {
    let storageRef = firebase.storage().ref();
    let uploadTask: firebase.storage.UploadTask = storageRef.child(`images/${file.name}`).put(file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {},
      (error) => console.log(error),
      () => {
        // console.log('done', uploadTask, uploadTask.snapshot.metadata.downloadURLs)
        // // item.url = uploadTask.snapshot.downloadURL;
        this.store.dispatch({
          type: FILE_UPLOADED,
          payload: {
            name: file.name,
            src: uploadTask.snapshot.metadata.downloadURLs[0]
          }
        })
        // item.isUploading = false;
        // this.saveImage({ name: item.file.name, url: item.url });
      }
    );


    return uploadTask;
  }

}
