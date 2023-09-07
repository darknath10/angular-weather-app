import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, startWith } from 'rxjs';
import { Location, SearchLocationsComponent, selectSelectedLocation } from '@farmapp/location';
import { ClockComponent } from '@farmapp/shared/ui';
import { UserInitialsComponent, selectUser } from '@farmapp/user';
import { CurrentWeatherComponent, WeatherForecastComponent } from '@farmapp/weather';

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
      <farm-app-search-locations></farm-app-search-locations>
      <farm-app-current-weather [location]="loc$ | async"></farm-app-current-weather>
      <ng-container *ngIf="timezone$ | async as tz">
        <farm-app-clock [timezone]="tz"></farm-app-clock>
      </ng-container>
      <farm-app-user-initials [user]="user$ | async"></farm-app-user-initials>
    </div>
    <div class="p-14">
      <farm-app-weather-forecast [location]="loc$ | async"></farm-app-weather-forecast>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  private readonly store = inject(Store);

  readonly loc$ = this.store.select(selectSelectedLocation).pipe(
    filter((location): location is Location => !!location),
    map(({ latitude, longitude, timezone }) => ({ latitude, longitude, timezone })),
  );
  
  readonly timezone$ = this.loc$.pipe(
    map(({ timezone }) => timezone),
    startWith('UTC'),
  );

  readonly user$ = this.store.select(selectUser);
}
