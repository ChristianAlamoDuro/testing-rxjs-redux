import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Test1Module } from './modules/test1/test1.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'test1',
  },
  {
    path: 'test1',
    loadChildren: () =>
      import('./modules/test1/test1.module').then((m) => m.Test1Module),
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, Test1Module, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
