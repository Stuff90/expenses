import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

import { REMOVE_FILE } from '../upload.actions';

@Component({
  selector: 'app-uploaded-images',
  templateUrl: './uploaded-images.component.html',
  styleUrls: ['./uploaded-images.component.scss']
})
export class UploadedImagesComponent implements OnInit {
  images: Observable<any>;

  constructor(
    private store: Store<any>,
  ) {
    this.images = this.store.select('file')
      .map(files => Object.values(files));
  }

  ngOnInit() {
  }

  deleteImage(image: any) {
    this.store.select('file').dispatch({
      type: REMOVE_FILE,
      payload: image.file.name,
    });
  }
}
