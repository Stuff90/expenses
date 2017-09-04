import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { MdButtonModule } from '@angular/material';

import { homeRoutes } from './home.routing';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    RouterModule.forChild(homeRoutes)
  ],
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
