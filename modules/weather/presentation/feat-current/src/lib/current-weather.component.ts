import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  inject,
} from '@angular/core';
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
  imports: [CommonModule, WeatherCodeImageComponent],
  template: `
    <div
      *ngIf="weather() as weather"
      class="flex justify-center items-center"
    >
      <farm-app-weather-code-img
        class="mr-2"
        [isDay]="weather.isDay"
        [wmoCode]="weather.wmoCode"
      ></farm-app-weather-code-img>
      <div class="flex flex-col">
        <b>{{ weather.temperature }}°C</b>
        <div>
          <span>{{ weather.relativeHumidity }}%</span>&nbsp;
          <span>{{ weather.precipitation }}mm</span>
        </div>
      </div>
    </div>
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
export class CurrentWeatherComponent implements OnChanges {
  private readonly store = inject(CURRENT_WEATHER_STORE);
  
  readonly weather = this.store.weather;
  readonly loading = this.store.loading;

  @Input() location: Location | null = null;

  ngOnChanges(): void {
    if (!this.location) return;
    this.store.fetchCurrentWeather(this.location);
  }
}
