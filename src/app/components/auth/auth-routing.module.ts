import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { redirectLoggedInTo } from '@angular/fire/auth-guard';

import { canActivate } from '@angular/fire/auth-guard';
const redirectLoggedInToItems = () => redirectLoggedInTo(['employees']);

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
    ...canActivate(redirectLoggedInToItems),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterModule),
    ...canActivate(redirectLoggedInToItems),
  },
  {
    path: 'forgot',
    loadChildren: () =>
      import('./forgot/forgot.module').then((m) => m.ForgotModule),
    ...canActivate(redirectLoggedInToItems),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
