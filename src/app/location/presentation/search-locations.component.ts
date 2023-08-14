import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, ViewChild, inject } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Location } from '../core/models';
import { LOCATIONS_STORE, provideLocationsStore } from './tokens';

const MATERIAL_MODULES = [
  MatAutocompleteModule,
  MatInputModule,
  MatFormFieldModule,
  MatProgressBarModule,
];

@Component({
  selector: 'app-search-locations',
  standalone: true,
  imports: [
    CommonModule,
    ...MATERIAL_MODULES,
  ],
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <mat-form-field>
        <mat-label>Location</mat-label>
        <input #queryInput
          type="text"
          matInput
          [matAutocomplete]="auto"
          (input)="triggerLocationsSearch()">
        <mat-autocomplete #auto="matAutocomplete"
          [displayWith]="displayFn"
          (optionSelected)="locationSelected.emit($event.option.value)">
          <mat-option *ngFor="let location of vm.locations"
            [value]="location">
            {{location.name}} - {{location.country}}
          </mat-option>
        </mat-autocomplete>
      </mat-form-field>
      <mat-progress-bar *ngIf="vm.loading" mode="indeterminate"></mat-progress-bar>
    </ng-container>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ provideLocationsStore() ],
})
export class SearchLocationsInputComponent {
  private readonly store = inject(LOCATIONS_STORE);
  readonly vm$ = this.store.vm$;

  @ViewChild('queryInput') private readonly queryInput!: ElementRef<HTMLInputElement>;
  
  @Output() readonly locationSelected = new EventEmitter<Location>();

  displayFn({ country, name }: Location) {
    return `${name} - ${country}`;
  }

  triggerLocationsSearch() {
    const { value } = this.queryInput.nativeElement;
    if (!value.length) return;
    this.store.searchLocations(value);
  }
}
