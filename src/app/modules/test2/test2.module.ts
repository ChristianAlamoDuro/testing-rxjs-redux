import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Test2Component } from './test2.component';

const routes: Routes = [
  {
    path: '',
    component: Test2Component,
  },
];
@NgModule({
  declarations: [Test2Component],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class Test2Module {}
