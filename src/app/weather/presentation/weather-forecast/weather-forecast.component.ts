import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { Location } from '../../core/models';
import { DailyForecastListItemComponent } from './components';
import { WEATHER_FORECAST_STORE, provideWeatherForecastStore } from './tokens';

@Component({
  selector: 'app-weather-forecast',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatListModule,
    DailyForecastListItemComponent,
  ],
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <mat-list>
        <ng-container *ngFor="let daily of vm.forecast">
          <mat-list-item class="mb-2">
            <app-dailly-forecast-list-item [dailyForecast]="daily"></app-dailly-forecast-list-item>
          </mat-list-item>
          <mat-divider></mat-divider>
        </ng-container>
      </mat-list>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideWeatherForecastStore()],
})
export class WeatherForecastComponent implements OnChanges {
  private readonly store = inject(WEATHER_FORECAST_STORE);
  readonly vm$ = this.store.vm$;

  @Input({ required: true }) location: Location | null = null;

  ngOnChanges() {
    if (!this.location) return;
    this.store.fetchWeatherForecast(this.location);
  }
}
