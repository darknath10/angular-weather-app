import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { Nullable } from '@farmapp/shared/types';
import { WeatherForecast } from '@farmapp/weather/core';
import { WeatherCodeImageComponent } from './weather-code-image.component';

type DailyForecast = WeatherForecast[number];

@Component({
  selector: 'farm-app-dailly-forecast-list-item',
  standalone: true,
  imports: [
    DatePipe,
    MatTooltip,
    WeatherCodeImageComponent,
  ],
  template: `
    @if (dailyForecast(); as dailyForecast) {
      <div class="flex items-center w-full">
        <span class="basis-1/3">{{dailyForecast.date | date: 'fullDate'}}</span>
        <div class="basis-1/6">
          <farm-app-weather-code-img class="h-12 w-12" [wmoCode]="dailyForecast.wmoCode"/>
        </div>
        <span class="basis-1/6" matTooltip="Min - Max Temperature">
          {{ dailyForecast.minTemperature }}°C - {{ dailyForecast.maxTemperature }}°C
        </span>
        <span class="basis-1/6" matTooltip="Precipitations">
          {{ dailyForecast.precipitation }}mm
        </span>
        <span class="basis-1/6" matTooltip="Evapotranspiration">
          {{ dailyForecast.evapotranspiration }}mm
        </span>
      </div>
    } @else {
      <i>No Data</i>
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
})
export class DailyForecastListItemComponent {
  dailyForecast = input.required<Nullable<DailyForecast>>();
}
