import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  inject,
} from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
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
    CommonModule,
    MatDividerModule,
    MatListModule,
    DailyForecastListItemComponent,
  ],
  template: `
    <mat-list>
      <ng-container *ngFor="let daily of forecast()">
        <mat-list-item class="mb-2">
          <farm-app-dailly-forecast-list-item
            [dailyForecast]="daily"
          ></farm-app-dailly-forecast-list-item>
        </mat-list-item>
        <mat-divider></mat-divider>
      </ng-container>
    </mat-list>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideWeatherForecastGateway(), provideWeatherForecastStore()],
})
export class WeatherForecastComponent implements OnChanges {
  private readonly store = inject(WEATHER_FORECAST_STORE);
  readonly forecast = this.store.forecast;

  @Input({ required: true }) location: Location | null = null;

  ngOnChanges() {
    if (!this.location) return;
    this.store.fetchWeatherForecast(this.location);
  }
}
