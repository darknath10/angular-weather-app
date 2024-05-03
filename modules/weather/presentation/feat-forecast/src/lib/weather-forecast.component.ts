import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatList, MatListItem } from '@angular/material/list';
import { Nullable } from '@farmapp/shared/types';
import { Location } from '@farmapp/weather/core';
import { provideWeatherForecastGateway } from '@farmapp/weather/providers';
import { DailyForecastListItemComponent } from '@farmapp/weather/ui';
import {
  WEATHER_FORECAST_STORE,
  provideWeatherForecastStore,
} from './weather-forecast-store.token';

@Component({
  selector: 'farm-app-weather-forecast',
  standalone: true,
  imports: [
    MatDivider,
    MatList,
    MatListItem,
    DailyForecastListItemComponent,
  ],
  template: `
    <mat-list>
      @for (daily of forecast(); track $index) {
        <mat-list-item class="mb-2">
          <farm-app-dailly-forecast-list-item [dailyForecast]="daily"/>
        </mat-list-item>
        <mat-divider/>
      }
    </mat-list>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideWeatherForecastGateway(), provideWeatherForecastStore()],
})
export class WeatherForecastComponent {
  private readonly store = inject(WEATHER_FORECAST_STORE);
  readonly forecast = this.store.forecast;

  readonly location = input.required<Nullable<Location>>();
  private readonly locationEffect = effect(() => {
    const location = this.location();
    if (!location) { return; }
    this.store.fetchWeatherForecast(location);
  }, {allowSignalWrites: true}); // TODO: check if still necessary after changing to signal store
}
