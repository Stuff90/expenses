import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedImagesComponent } from './uploaded-images.component';

describe('UploadedImagesComponent', () => {
  let component: UploadedImagesComponent;
  let fixture: ComponentFixture<UploadedImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadedImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
