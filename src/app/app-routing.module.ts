import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: 'test1',
  },
  {
    path: 'test1',
    loadChildren: () =>
      import('./modules/test1/test1.module').then((m) => m.Test1Module),
  },
  {
    path: 'test2',
    loadChildren: () =>
      import('./modules/test2/test2.module').then((m) => m.Test2Module),
  },
  {
    path: 'ngrx',
    loadChildren: () =>
      import('./modules/ngrx/ngrx.module').then((m) => m.NgrxModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
