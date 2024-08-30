import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/seguridad/login/login.component';


export const routes: Routes = [
  
  {
  path: '',
  redirectTo: 'pages/seguridad/login',
  pathMatch: 'full'
  },
  {
  path: 'seguridad',
  loadChildren: () => import('./pages/seguridad/seguridad.module')
  .then(m => m.SeguridadModule),
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  { path: '**', redirectTo: 'pages/seguridad/login' }  








  
 // { path: '', redirectTo: 'pages', pathMatch: 'full' },
 //{ path: '**', redirectTo: 'pages' },
  
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config),RouterModule.forRoot(routes, { enableTracing: true, useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
