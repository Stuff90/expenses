import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdToolbarModule, MdIconModule } from '@angular/material';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/race';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/distinct';
import 'rxjs/add/operator/distinctUntilChanged';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routing';
import { appReducer } from './shared/app.reducer';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FirebaseService } from './shared/firebase/firebase.service';

import { HomeModule } from './home/home.module';
import { ExpensesModule } from './expenses/expenses.module';
import { EmployeeModule } from './employee/employee.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    MdIconModule,
    BrowserModule,
    MdButtonModule,
    MdToolbarModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({app: appReducer}),
    StoreDevtoolsModule.instrument({}),
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(
      appRoutes, { enableTracing: false }
    ),

    HomeModule,
    ExpensesModule,
    EmployeeModule,
  ],
  exports: [ ],
  providers: [
    FirebaseService,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
