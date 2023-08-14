import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { Location, SearchLocationsInputComponent } from '../location';

@Component({
  selector: 'app-sign-up-form',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    SearchLocationsInputComponent,
  ],
  template: `
    <div class="flex">
      <mat-form-field class="mr-10">
        <mat-label>First Name</mat-label>
        <input type="text" matInput [value]="firstName" (input)="setFirstName($event)">
      </mat-form-field>
      <mat-form-field class="mr-10">
        <mat-label>Last Name</mat-label>
        <input type="text" matInput [value]="lastName" (input)="setLastName($event)">
      </mat-form-field>
      <app-search-locations (locationSelected)="setLocation($event)"></app-search-locations>
    </div>
    <button type="button" mat-flat-button color="primary" (click)="emitDataIfFilledIn()">Ok</button>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpFormComponent {
  snackbar = inject(MatSnackBar);

  firstName: string | null = null;
  lastName: string | null = null;
  location: Location | null = null;

  @Output() userSubmit = new EventEmitter<{firstName: string; lastName: string; location: Location}>();

  setFirstName(e: Event) {
    this.firstName = (e.target as HTMLInputElement).value;
  }

  setLastName(e: Event) {
    this.lastName = (e.target as HTMLInputElement).value;
  }

  setLocation(location: Location) {
    this.location = location;
  }

  emitDataIfFilledIn() {
    if (!this.firstName || !this.lastName || !this.location) {
      this.snackbar.open('Please set your name & location', 'Dismiss');
      return;
    }
    this.userSubmit.emit({ firstName: this.firstName, lastName: this.lastName, location: this.location });
  }
}
