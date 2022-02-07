import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {NeedAuthGuard} from './auth.guard';
import { MetaGuard } from 'ng2-meta';

const routes: Routes = [


  {
    path: 'login',
    component: LoginComponent,
	  canActivate: []
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
