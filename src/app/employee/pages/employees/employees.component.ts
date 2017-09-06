import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '../../../shared/firebase/firebase.service';
import { Employee } from '../../shared/interfaces/employee.interface';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employees: Observable<any>;

  constructor(
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.employees = this.firebaseService.getCollection('/employees')
      .map((employees: any[]) =>
        employees.map((employee : any) =>
          Object.assign(employee, {employeeId: employee.$key})
        )
      )
  }

}
