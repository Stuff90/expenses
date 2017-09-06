import { Store } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { EMPLOYEE_FORM_RESET, EMPLOYEE_FORM_UPDATE, EMPLOYEE_FORM_SUBMIT } from '../../employee.actions';
import { EmployeeState } from '../../interfaces/employeeState.interface';
import { Employee } from '../../interfaces/employee.interface';

@Component({
  selector: 'app-add-employee-form',
  templateUrl: './add-employee-form.component.html',
  styleUrls: ['./add-employee-form.component.scss']
})
export class AddEmployeeFormComponent implements OnInit {
  addEmployeeForm: FormGroup;
  addEmployeeTrigger = new Subject<boolean>();
  isFormValid: Observable<boolean>;

  constructor(
    private store: Store<any>,
  ) {
    this.addEmployeeForm = new FormGroup({
      firstName: new FormControl('', [<any>Validators.required, <any>Validators.minLength(3)]),
      lastName: new FormControl('', [<any>Validators.required, <any>Validators.minLength(3)]),
      emailAddress: new FormControl('', [<any>Validators.required, <any>Validators.email]),
    });
  }

  ngOnInit() {
    this. isFormValid = this.store.select('employee')
      .map((employeeState: EmployeeState) => employeeState.form.data)
      .take(1)
      .do((employee: Employee) => this.addEmployeeForm.setValue(employee))
      .switchMapTo(this.addEmployeeForm.valueChanges)
      .do((validEmplyee: Employee) => this.store.dispatch({
        type: EMPLOYEE_FORM_UPDATE,
        payload: validEmplyee
      }))
      .startWith(this.addEmployeeForm.valid)
      .switchMapTo(this.addEmployeeForm.statusChanges)
      .map(status => status === 'VALID');
  }

  onSubmit(): void {
    this.store.dispatch({
      type: EMPLOYEE_FORM_SUBMIT,
      payload: true
    });
    this.addEmployeeForm.reset();
  }

}
