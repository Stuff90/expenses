import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MdInputModule,
  MdButtonModule,
  MdSelectModule,
  MdDatepickerModule,
  MdNativeDateModule,
  MdSlideToggleModule,
  MdAutocompleteModule,
} from '@angular/material';

import { expensesRoutes } from './expenses.routing';
import { UploadModule } from '../upload/upload.module';
import { expensesReducer } from './shared/expenses.reducer';
import { ExpensesEffects } from './shared/expenses.effects';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { ExpensesFormComponent } from './shared/components/expenses-form/expenses-form.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    UploadModule,
    MdInputModule,
    MdSelectModule,
    MdButtonModule,
    MdNativeDateModule,
    MdDatepickerModule,
    MdSlideToggleModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    MdAutocompleteModule,
    RouterModule.forChild(expensesRoutes),
    EffectsModule.forFeature([ExpensesEffects]),
    StoreModule.forFeature('expenses', expensesReducer),
  ],
  declarations: [
    ExpensesComponent,
    ExpensesFormComponent
  ]
})
export class ExpensesModule { }
