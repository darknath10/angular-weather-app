import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WeatherForecast } from '../../../core/models';
import { WeatherCodeImageComponent } from '../../shared/components';

type DailyForecast = WeatherForecast[number];

@Component({
  selector: 'app-dailly-forecast-list-item',
  standalone: true,
  imports: [
    CommonModule,
    MatTooltipModule,
    WeatherCodeImageComponent,
  ],
  template: `
    <ng-container *ngIf="dailyForecast; else nodata">
      <div class="flex items-center w-full">
        <span class="basis-1/3">{{dailyForecast.date | date:'fullDate'}}</span>
        <div class="basis-1/6">
          <app-weather-code-img class="h-12 w-12" [wmoCode]="dailyForecast.wmoCode"></app-weather-code-img>
        </div>
        <span class="basis-1/6" matTooltip="Min - Max Temperature">{{dailyForecast.minTemperature}}°C - {{dailyForecast.maxTemperature}}°C</span>
        <span class="basis-1/6" matTooltip="Precipitations">{{dailyForecast.precipitation}}mm</span>
        <span class="basis-1/6" matTooltip="Evapotranspiration">{{dailyForecast.evapotranspiration}}mm</span>
      </div>
    </ng-container>
    <ng-template #nodata>
      <i>No Data</i>
    </ng-template>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyForecastListItemComponent {
  @Input({ required: true }) dailyForecast: DailyForecast | null = null;
}

