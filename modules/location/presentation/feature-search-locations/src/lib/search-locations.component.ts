import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, ViewChild, inject } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Location, LocationActions } from '@farmapp/location/core';
import { provideSearchLocationsGateway } from '@farmapp/location/presentation/providers';
import { SEARCH_LOCATIONS_STORE, provideSearchLocationsStore } from './search-locations-store.token';
import { Store } from '@ngrx/store';

const MATERIAL_MODULES = [
  MatAutocompleteModule,
  MatInputModule,
  MatFormFieldModule,
  MatProgressBarModule,
];

@Component({
  selector: 'farm-app-search-locations',
  standalone: true,
  imports: [
    CommonModule,
    ...MATERIAL_MODULES,
  ],
  template: `
    <mat-form-field>
      <mat-label>Location</mat-label>
      <input #queryInput
        type="text"
        matInput
        [matAutocomplete]="auto"
        (input)="triggerLocationsSearch()">
      <mat-autocomplete #auto="matAutocomplete"
        [displayWith]="displayFn"
        (optionSelected)="setSelectedLocation($event.option.value)">
        <mat-option *ngFor="let location of locations()"
          [value]="location">
          {{location.name}} - {{location.country}}
        </mat-option>
      </mat-autocomplete>
    </mat-form-field>
    <mat-progress-bar *ngIf="loading()" mode="indeterminate"></mat-progress-bar>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideSearchLocationsGateway(),
    provideSearchLocationsStore(),
  ],
})
export class SearchLocationsComponent {
  private readonly cStore = inject(SEARCH_LOCATIONS_STORE);
  private readonly store = inject(Store);

  readonly locations = this.cStore.locations;
  readonly loading = this.cStore.loading;

  @ViewChild('queryInput') private readonly queryInput!: ElementRef<HTMLInputElement>;
  
  @Output() readonly locationSelected = new EventEmitter<Location>();

  displayFn({ country, name }: Location) {
    return `${name} - ${country}`;
  }

  triggerLocationsSearch() {
    const { value } = this.queryInput.nativeElement;
    if (!value.length) return;
    this.cStore.searchLocations(value);
  }

  setSelectedLocation(location: Location) {
    this.store.dispatch(LocationActions.selectLocation({ location }));
    this.locationSelected.emit(location);
  }
}
