import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { APP_STORE } from './app-store.token';
import { ClockComponent } from './clock';
import { Location, SearchLocationsInputComponent } from './location';
import { CurrentWeatherComponent, WeatherForecastComponent } from './weather';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SearchLocationsInputComponent,
    CurrentWeatherComponent,
    WeatherForecastComponent,
    ClockComponent,
  ],
  selector: 'app-root',
  template: `
    <!-- <router-outlet></router-outlet> -->
    <div class="flex flex-row p-4">
      <app-search-locations (locationSelected)="onLocationSelected($event)"></app-search-locations>
      <app-current-weather [location]="loc$ | async"></app-current-weather>
      <ng-container *ngIf="timezone$ | async as tz">
        <app-clock [timezone]="tz"></app-clock>
      </ng-container>
    </div>
    <div>
      <app-weather-forecast [location]="loc$ | async"></app-weather-forecast>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly store = inject(APP_STORE);

  readonly loc$ = this.store.selectedLocation$.pipe(
    filter((location): location is Location => !!location),
    map(({ latitude, longitude, timezone }) => ({ latitude, longitude, timezone })),
  );
  
  readonly timezone$ = this.loc$.pipe(
    map(({ timezone }) => timezone),
    startWith('UTC'),
  );

  onLocationSelected(e: Location) {
    this.store.setSelectedLocation(e);
  }
}
