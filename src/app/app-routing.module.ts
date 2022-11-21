import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutenticationGuard } from './guards/autentication.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( modulo => modulo.LoginPageModule)
  },
  {
    path: 'scan-qr',
    loadChildren: () => import('./pages/scan-qr/scan-qr.module').then( modulo => modulo.ScanQRPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( modulo => modulo.HomePageModule),
    canActivate: [AutenticationGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( modulo => modulo.RegisterPageModule)
  },
  {
    path: 'generate-qr',
    loadChildren: () => import('./pages/generate-qr/generate-qr.module').then( modulo => modulo.GenerateQRPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
