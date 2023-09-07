import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { SignUpFormComponent } from '@farmapp/user';

@Component({
  standalone: true,
  imports: [
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
          <farm-app-sign-up-form (userSubmit)="navigateToHomePage()"></farm-app-sign-up-form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpPageComponent {
  private readonly router = inject(Router);

  navigateToHomePage() {
    this.router.navigateByUrl('home');
  }
}
