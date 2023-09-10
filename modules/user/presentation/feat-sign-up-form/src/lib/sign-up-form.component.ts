import { ChangeDetectionStrategy, Component, EventEmitter, Output, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { Location, SearchLocationsComponent } from '@farmapp/location';
import { Store } from '@ngrx/store';
import { Nullable } from '@farmapp/shared/types';
import { UserActions } from '@farmapp/user/core';

@Component({
  selector: 'farm-app-sign-up-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    SearchLocationsComponent,
  ],
  template: `
    <div class="flex">
      <mat-form-field class="mr-10">
        <mat-label>First Name</mat-label>
        <input type="text" matInput [value]="firstName()" (input)="setFirstName($event)">
      </mat-form-field>
      <mat-form-field class="mr-10">
        <mat-label>Last Name</mat-label>
        <input type="text" matInput [value]="lastName()" (input)="setLastName($event)">
      </mat-form-field>
      <farm-app-search-locations (locationSelected)="setLocation($event)"></farm-app-search-locations>
    </div>
    <button type="button" mat-flat-button color="primary" (click)="emitDataIfFilledIn()">Ok</button>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpFormComponent {
  private readonly snackbar = inject(MatSnackBar);
  private readonly store = inject(Store);

  firstName = signal<string>('');
  lastName = signal<string>('');
  location = signal<Nullable<Location>>(null);

  private readonly isValid = computed(() => !!this.firstName() && !!this.lastName() && !!this.location());

  @Output() userSubmit = new EventEmitter<void>();

  setFirstName(e: Event) {
    this.firstName.set((e.target as HTMLInputElement).value);
  }

  setLastName(e: Event) {
    this.lastName.set((e.target as HTMLInputElement).value);
  }

  setLocation(location: Location) {
    this.location.set(location);
  }

  emitDataIfFilledIn() {
    if (!this.isValid()) {
      this.snackbar.open('Please set your name & location', 'Dismiss');
      return;
    }
    const user = { firstName: this.firstName(), lastName: this.lastName() };
    this.store.dispatch(UserActions.setUser({ user }));
    this.userSubmit.emit();
  }
}
