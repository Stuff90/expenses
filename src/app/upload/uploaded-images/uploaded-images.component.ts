import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input } from '@angular/core';

import { REMOVE_FILE, FILE_UPDATE } from '../upload.actions';

@Component({
  selector: 'app-uploaded-images',
  templateUrl: './uploaded-images.component.html',
  styleUrls: ['./uploaded-images.component.scss']
})
export class UploadedImagesComponent implements OnInit {
  @Input() default: any[];

  images: Observable<any>;

  constructor(
    private store: Store<any>,
  ) {
    this.images = this.store.select('file')
      .map(files => Object.values(files));
  }

  ngOnInit() {
    if (this.default) {
      this.default.map(image => this.setDefaultImage(image));
    }
  }

  private setDefaultImage(file: any) {
    this.store.dispatch({
      type: FILE_UPDATE,
      payload: file
    });
  }

  deleteImage(image: any) {
    this.store.select('file').dispatch({
      type: REMOVE_FILE,
      payload: image.name,
    });
  }
}
