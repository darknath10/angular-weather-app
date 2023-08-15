import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { APP_STORE } from '../app-store.token';
import { Location } from '../location';
import { SignUpFormComponent } from './sign-up-form.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    SignUpFormComponent,
  ],
  template: `
    <div class="mt-40 mx-80">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Sign Up</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <app-sign-up-form (userSubmit)="setUserAndLocation($event)"></app-sign-up-form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpPageComponent {
  private readonly store = inject(APP_STORE);
  private readonly router = inject(Router);

  setUserAndLocation(val: { firstName: string, lastName: string, location: Location}) {
    const { firstName, lastName, location } = val;
    this.store.setUser({ firstName, lastName });
    this.store.setSelectedLocation(location);
    this.router.navigateByUrl('home');
  }
}
