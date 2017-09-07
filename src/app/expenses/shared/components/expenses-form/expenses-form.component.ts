import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { Expense } from '../../interfaces/expense.interface';
import { EXPENSE_UPDATE, SAVE_EXPENSE } from '../../expenses.actions';
import { FirebaseService } from '../../../../shared/firebase/firebase.service';

const hourRegexp = /^([0-9]|0[0-9]|1[0-9]|2[0-3])$/;
const minuteRegexp = /^[0-5][0-9]$/;

@Component({
  selector: 'app-expenses-form',
  templateUrl: './expenses-form.component.html',
  styleUrls: ['./expenses-form.component.scss']
})
export class ExpensesFormComponent implements OnInit {
  isFormValid: Observable<boolean>;
  filteredEmployees: Observable<any[]>;
  expensesForm: FormGroup;

  constructor(
    private store: Store<any>,
    private firebaseService: FirebaseService
  ) {
    this.expensesForm = this.getFromGroup();
    this.filteredEmployees = this.expensesForm.valueChanges
      .map(formData => formData.employee)
      .filter(input => typeof input === 'string')
      .map(input => input.toLowerCase())
      .switchMap((input) => this.filterEmmployeesFromInput(input));

    this.store.select('expenses')
      .map((expensesState: any) => expensesState.form.data)


    this.isFormValid = this.expensesForm.valueChanges
      .do((expenseRawData: any) => {
        if (this.expensesForm.valid) {
          this.store.dispatch({
            type: EXPENSE_UPDATE,
            payload: Object.assign(expenseRawData, {
              eventDatetime: this.getDatetimeFromRaw(expenseRawData.eventDatetime).toISOString(),
              expenseDatetime: this.getDatetimeFromRaw(expenseRawData.expenseDatetime).toISOString(),
              employee: this.getIdFromEmployee(expenseRawData.employee),
              reviewedBy: this.getIdFromEmployee(expenseRawData.employee),
            })
          })
        }
      })
      // .do(e => {
      //   if (this.expensesForm.valid) {
      //     this.getFormDataFromStore(e)
      //     .do(console.log)
      //     .subscribe();
      //   }
      // })
      .switchMapTo(this.expensesForm.statusChanges)
      .map((status: string) => status === 'VALID')
      .distinctUntilChanged();



  }

  ngOnInit(): void {
    this.expensesForm.controls.description.setValue('desc');
    this.expensesForm.controls.expenseDatetime.setValue({ date: new Date(), timeHour: 1, timeMinute: 1});
    this.expensesForm.controls.eventDatetime.setValue({ date: new Date(), timeHour: 1, timeMinute: 1});
    this.expensesForm.controls.employee.setValue({
      firstName: 'first',
      lastName: 'last',
      $key: 'fb694195-38a3-bf9d-74ce-e2e262fabccc'
    });
    this.expensesForm.controls.reviewedBy.setValue({
      firstName: 'first',
      lastName: 'last',
      $key: 'fb694195-38a3-bf9d-74ce-e2e262fabccc'
    });

  }

  private getDatetimeFromRaw(raw: {
    date: Date,
    timeHour: number,
    timeMinute: number,
  }): Date {
    raw.date.setHours(raw.timeHour);
    raw.date.setMinutes(raw.timeMinute);

    return raw.date;
  }

  private getIdFromEmployee(employee: any): string {
    return employee.$key;
  }

  private getFormDataFromStore(storeData: any): Observable<any> {
    let eventDatetime = new Date(storeData.eventDatetime);
    let expenseDatetime = new Date(storeData.expenseDatetime);


    return Observable.combineLatest(
      this.firebaseService.getObject(`/employees/${storeData.employee}`),
      this.firebaseService.getObject(`/employees/${storeData.reviewedBy}`),
    )
    .map((employeesData: any[]) => {
      let [employee, reviewedBy] = employeesData;

      return {employee, reviewedBy};
    })
    .map((employeesData: any) => Object.assign({}, storeData, {
      eventDatetime: {
        date: eventDatetime,
        timeHour: eventDatetime.getHours(),
        timeMinute: eventDatetime.getMinutes()
      },
      expenseDatetime: {
        date: expenseDatetime,
        timeHour: expenseDatetime.getHours(),
        timeMinute: expenseDatetime.getMinutes()
      }
    }, employeesData));
  }

  private getFromGroup(): FormGroup {
    return new FormGroup({
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
      receiptPhotoUrl: new FormControl(),
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

  onSubmit() {
    this.store.dispatch({
      type: SAVE_EXPENSE,
    });
    this.expensesForm.reset();
  }

  onFileListUpdate(fileSrc: string[]){
    this.expensesForm.controls.receiptPhotoUrl.setValue(fileSrc);
  }

  getEmployeeFullName(employee: any): string {
    return employee ?  `${employee.firstName} ${employee.lastName}` : null;
  }

}
