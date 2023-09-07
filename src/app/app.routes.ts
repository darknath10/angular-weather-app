import { Route } from '@angular/router';
import { HomePageComponent } from '@farmapp/pages/home';
import { SignUpPageComponent } from '@farmapp/pages/sign-up';
import { userGuard } from '@farmapp/shared/guards';

export const appRoutes: Route[] = [
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [userGuard],
  },
  {
    path: 'sign-up',
    component: SignUpPageComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
