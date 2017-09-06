import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { UploadService } from './upload.service';
import { FileUploadModule } from 'ng2-file-upload';
import { MdButtonModule, MdCardModule, MdProgressSpinnerModule } from '@angular/material';

import { fileReducer } from './upload.reducer';
import { FileEffects } from './upload.effects';
import { UploadInputComponent } from './upload-input/upload-input.component';
import { UploadedImagesComponent } from './uploaded-images/uploaded-images.component';

@NgModule({
  imports: [
    CommonModule,
    MdCardModule,
    MdButtonModule,
    FileUploadModule,
    MdProgressSpinnerModule,
    StoreModule.forFeature('file', fileReducer),
    EffectsModule.forFeature([FileEffects]),

  ],
  providers: [
    UploadService,
  ],
  declarations: [
    UploadInputComponent,
    UploadedImagesComponent,
  ],
  exports: [
    UploadInputComponent,
    UploadedImagesComponent,
  ]
})
export class UploadModule { }
