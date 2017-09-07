import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesEditionComponent } from './employees-edition.component';

describe('EmployeesEditionComponent', () => {
  let component: EmployeesEditionComponent;
  let fixture: ComponentFixture<EmployeesEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
