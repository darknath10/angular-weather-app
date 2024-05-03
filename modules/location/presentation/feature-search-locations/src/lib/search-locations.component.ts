import { ChangeDetectionStrategy, Component, ElementRef, inject, output, viewChild } from '@angular/core';
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatProgressBar } from '@angular/material/progress-bar';
import { Store } from '@ngrx/store';
import { Location, LocationActions } from '@farmapp/location/core';
import { provideSearchLocationsGateway } from '@farmapp/location/presentation/providers';
import { SEARCH_LOCATIONS_STORE, provideSearchLocationsStore } from './search-locations-store.token';

@Component({
  selector: 'farm-app-search-locations',
  standalone: true,
  imports: [
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatInput,
    MatFormField,
    MatLabel,
    MatOption,
    MatProgressBar,
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
        @for (location of locations(); track $index) {
          <mat-option [value]="location">
            {{location.name}} - {{location.country}}
          </mat-option>
        }
      </mat-autocomplete>
    </mat-form-field>
    @if (loading()) {
      <mat-progress-bar mode="indeterminate"></mat-progress-bar>
    }
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

  private readonly queryInput = viewChild.required<ElementRef<HTMLInputElement>>('queryInput');
  
  readonly locationSelected = output<Location>();

  displayFn({ country, name }: Location) {
    return `${name} - ${country}`;
  }

  triggerLocationsSearch() {
    const { value } = this.queryInput().nativeElement;
    if (!value.length) return;
    this.cStore.searchLocations(value);
  }

  setSelectedLocation(location: Location) {
    this.store.dispatch(LocationActions.selectLocation({ location }));
    this.locationSelected.emit(location);
  }
}
