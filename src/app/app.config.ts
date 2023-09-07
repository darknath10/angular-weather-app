import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideState, provideStore } from '@ngrx/store';
import { locationFeature } from '@farmapp/location';
import { userFeature } from '@farmapp/user';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    importProvidersFrom(MatSnackBarModule),
    {
        provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
        useValue: { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top' },
    },
    provideStore(),
    provideState(locationFeature),
    provideState(userFeature),
],
};
