import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { filter, map, startWith } from 'rxjs';
import { Location, SearchLocationsComponent } from '@farmapp/location';
import { CurrentWeatherComponent, WeatherForecastComponent } from '@farmapp/weather';
import { APP_STORE } from '../app-store.token';
import { ClockComponent } from '../clock';
import { UserInitialsComponent } from '../user';

@Component({
  standalone: true,
  imports: [
    CommonModule,    
    SearchLocationsComponent,
    CurrentWeatherComponent,
    WeatherForecastComponent,
    ClockComponent,
    UserInitialsComponent,
  ],
  template: `
    <div class="flex flex-row justify-around items-center p-2 mb-4 mat-elevation-z4">
      <farm-app-search-locations (locationSelected)="onLocationSelected($event)"></farm-app-search-locations>
      <farm-app-current-weather [location]="loc$ | async"></farm-app-current-weather>
      <ng-container *ngIf="timezone$ | async as tz">
        <app-clock [timezone]="tz"></app-clock>
      </ng-container>
      <app-user-initials [user]="user$ | async"></app-user-initials>
    </div>
    <div class="p-14">
      <farm-app-weather-forecast [location]="loc$ | async"></farm-app-weather-forecast>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  private readonly store = inject(APP_STORE);

  readonly loc$ = this.store.selectedLocation$.pipe(
    filter((location): location is Location => !!location),
    map(({ latitude, longitude, timezone }) => ({ latitude, longitude, timezone })),
  );
  
  readonly timezone$ = this.loc$.pipe(
    map(({ timezone }) => timezone),
    startWith('UTC'),
  );

  readonly user$ = this.store.user$;

  onLocationSelected(e: Location) {
    this.store.setSelectedLocation(e);
  }
}
