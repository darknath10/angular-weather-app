import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import { Nullable } from '@farmapp/shared/types';
import { Location } from '@farmapp/weather/core';
import { provideCurrentWeatherGateway } from '@farmapp/weather/providers';
import { WeatherCodeImageComponent } from '@farmapp/weather/ui';
import {
  CURRENT_WEATHER_STORE,
  provideCurrentWeatherStore,
} from './current-weather-store.token';

@Component({
  selector: 'farm-app-current-weather',
  standalone: true,
  imports: [WeatherCodeImageComponent],
  template: `
    @if (weather(); as weather) {
      <div class="flex justify-center items-center">
        <farm-app-weather-code-img
          class="mr-2"
          [isDay]="weather.isDay"
          [wmoCode]="weather.wmoCode"
        />
        <div class="flex flex-col">
          <b>{{ weather.temperature }}°C</b>
          <div>
            <span>{{ weather.relativeHumidity }}%</span>&nbsp;
            <span>{{ weather.precipitation }}mm</span>
          </div>
        </div>
      </div>
    }
  `,
  styles: [
    `
      :host {
        display: block;
      }
      app-weather-code-img {
        width: 75px;
        height: 75px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideCurrentWeatherGateway(), provideCurrentWeatherStore()],
})
export class CurrentWeatherComponent {
  private readonly store = inject(CURRENT_WEATHER_STORE);
  
  readonly weather = this.store.weather;
  readonly loading = this.store.loading;

  readonly location = input<Nullable<Location>>(null);
  private readonly locationEffect = effect(() => {
    const location = this.location();
    if (!location) { return; }
    this.store.fetchCurrentWeather(location);
  }, {allowSignalWrites: true}); //TODO: check if still necessary when moving to signal store
}
