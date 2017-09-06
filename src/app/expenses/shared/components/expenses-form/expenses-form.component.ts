import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { FirebaseService } from '../../../../shared/firebase/firebase.service';

const hourRegexp = /^([0-9]|0[0-9]|1[0-9]|2[0-3])$/;
const minuteRegexp = /^[0-5][0-9]$/;
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-expenses-form',
  templateUrl: './expenses-form.component.html',
  styleUrls: ['./expenses-form.component.scss']
})
export class ExpensesFormComponent implements OnInit {
  filteredEmployees: Observable<any[]>;
  expensesForm: FormGroup;

  pouet(e){
    console.log(e);
  }

  constructor(
    private firebaseService: FirebaseService
  ) {

    this.expensesForm = this.getFromGroup();
    this.filteredEmployees = this.expensesForm.valueChanges
      .map(formData => formData.employee)
      .filter(input => typeof input === 'string')
      .map(input => input.toLowerCase())
      .switchMap((input) => this.filterEmmployeesFromInput(input));
  }

  ngOnInit(): void {

  }

  private getFromGroup(): FormGroup {
    return new FormGroup({
      pouet: new FormControl(),
      eventDatetime: new FormGroup({
        date: new FormControl(),
        timeHour: new FormControl([<any>Validators.required, <any>Validators.pattern(hourRegexp)]),
        timeMinute: new FormControl([<any>Validators.required, <any>Validators.pattern(minuteRegexp)]),
      }, this.validateDatetime ),
      expenseDatetime: new FormGroup({
        date: new FormControl(),
        timeHour: new FormControl([<any>Validators.required, <any>Validators.pattern(hourRegexp)]),
        timeMinute: new FormControl([<any>Validators.required, <any>Validators.pattern(minuteRegexp)]),
      }, this.validateDatetime ),
      amount: new FormControl('', [<any>Validators.required, <any>Validators.min(0)]),
      approved: new FormControl(false),
      employee: new FormControl(),
      reviewedBy: new FormControl(),
      description: new FormControl('', [<any>Validators.required, <any>Validators.max(300)]),
    });
  }

  private validateDatetime(input: any): ValidationErrors {
    let errors: ValidationErrors = {};

    if (!(input.value.date instanceof Date)) {
      errors.date = 'Invalid date';
    }

    if (
      typeof input.value.timeHour !== 'number'
      || typeof input.value.timeMinute !== 'number'
    ) {
      errors.emptyTime = 'Time is empty';
    } else {
      if (input.valuetimeHour > 23) {
        errors.invalidHour = 'Hour is invalid';
      }
      if (input.value.timeMinute > 59) {
        errors.invalidMinute = 'Minute is invalid';
      }
    }

    return errors;
  }

  private filterEmmployeesFromInput(input: string): Observable<any> {
    return this.firebaseService.getCollection('/employees')
      .map((employees: any[]) =>
        employees.filter((employee) =>
        `${employee.firstName} ${employee.lastName}`.toLowerCase().indexOf(input) >= 0
      )
    )
  }

  getEmployeeFullName(employee: any): string {
    return employee ?  `${employee.firstName} ${employee.lastName}` : null;
  }

}
