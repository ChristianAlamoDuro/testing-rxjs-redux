import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Test1Module } from './modules/test1/test1.module';
import { Test2Module } from './modules/test2/test2.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Test1Module,
    HttpClientModule,
    Test2Module,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
