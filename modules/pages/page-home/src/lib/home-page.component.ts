import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { SearchLocationsComponent, selectLocationCoordinatesAndTimezone, selectTimezone } from '@farmapp/location';
import { ClockComponent } from '@farmapp/shared/ui';
import { UserInitialsComponent, selectUser } from '@farmapp/user';
import { CurrentWeatherComponent, WeatherForecastComponent } from '@farmapp/weather';

@Component({
  standalone: true,
  imports: [
    SearchLocationsComponent,
    CurrentWeatherComponent,
    WeatherForecastComponent,
    ClockComponent,
    UserInitialsComponent,
  ],
  template: `
    <div class="flex flex-row justify-around items-center p-2 mb-4 mat-elevation-z4">
      <farm-app-search-locations/>
      <farm-app-current-weather [location]="location()"/>
      <farm-app-clock [timezone]="timezone()"/>
      @if (user(); as user) {
        <farm-app-user-initials [user]="user"/>
      }
    </div>
    <div class="p-14">
      <farm-app-weather-forecast [location]="location()"/>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  private readonly store = inject(Store);

  readonly location = this.store.selectSignal(selectLocationCoordinatesAndTimezone);
  readonly timezone = this.store.selectSignal(selectTimezone);
  readonly user = this.store.selectSignal(selectUser);
}
