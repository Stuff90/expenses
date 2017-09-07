import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesEditionComponent } from './expenses-edition.component';

describe('ExpensesEditionComponent', () => {
  let component: ExpensesEditionComponent;
  let fixture: ComponentFixture<ExpensesEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensesEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
