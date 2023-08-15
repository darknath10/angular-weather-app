import { Route } from '@angular/router';
import { SignUpPageComponent } from './user';
import { HomePageComponent } from './home';
import { userGuard } from './user.guard';

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
