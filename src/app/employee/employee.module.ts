import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MdInputModule, MdButtonModule, MdCardModule, MdIconModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { employeeRoutes } from './employee.routing';
import { EmployeeEffects } from './shared/employee.effects';
import { employeeReducer } from './shared/employee.reducers';
import { EmployeesComponent } from './pages/employees/employees.component';
import { AddEmployeeFormComponent } from './shared/components/add-employee-form/add-employee-form.component';
import { EmployeeCardComponent } from './shared/components/employee-card/employee-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdCardModule,
    MdInputModule,
    MdIconModule,
    MdButtonModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([EmployeeEffects]),
    StoreModule.forFeature('employee', employeeReducer ),
    RouterModule.forChild(employeeRoutes),
  ],
  declarations: [
    EmployeesComponent,
    AddEmployeeFormComponent,
    EmployeeCardComponent
  ]
})
export class EmployeeModule { }
