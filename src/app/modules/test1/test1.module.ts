import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Test1Component } from './test1.component';

const routes: Routes = [
  {
    path: '',
    component: Test1Component,
  },
];
@NgModule({
  declarations: [Test1Component],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class Test1Module {}
