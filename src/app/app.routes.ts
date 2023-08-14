import { Route } from '@angular/router';
import { SignUpPageComponent } from './user';

export const appRoutes: Route[] = [
  {
    path: 'sign-up',
    component: SignUpPageComponent,
  },
  {
    path: '',
    redirectTo: 'sign-up',
    pathMatch: 'full',
  },
];
