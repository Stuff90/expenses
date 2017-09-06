import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

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
      .map(files => Object.values(files))
      // .do(console.log);
  }

  ngOnInit() {
  }

}
