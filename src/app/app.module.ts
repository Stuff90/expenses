import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MdButtonModule, MdToolbarModule, MdIconModule } from '@angular/material';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/race';
import 'rxjs/add/operator/filter';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';

import { appRoutes } from './app.routing';
import { appReducer } from './shared/app.reducer';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    MdIconModule,
    MdButtonModule,
    MdToolbarModule,
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({}),
    StoreModule.forRoot({app: appReducer}),
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(
      appRoutes, { enableTracing: false }
    ),
    BrowserModule,

    HomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
