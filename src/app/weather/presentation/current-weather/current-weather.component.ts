import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, inject } from '@angular/core';
import { Location } from '../../core/models';
import { WeatherCodeImageComponent } from '../shared/components';
import { CURRENT_WEATHER_STORE, provideCurrentWeatherStore } from './tokens';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [CommonModule, WeatherCodeImageComponent],
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <div *ngIf="vm.weather as weather" class="flex justify-center items-center">
        <app-weather-code-img [isDay]="weather.isDay" [wmoCode]="weather.wmoCode"></app-weather-code-img>
        <div class="flex flex-col">
          <b>{{weather.temperature}}°C</b>
          <div>
            <span>{{weather.relativeHumidity}}%</span>&nbsp;
            <span>{{weather.precipitation}}mm</span>
          </div>
        </div>
      </div>
    </ng-container>
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
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideCurrentWeatherStore()],
})
export class CurrentWeatherComponent implements OnChanges {
  private readonly store = inject(CURRENT_WEATHER_STORE);
  readonly vm$ = this.store.vm$;

  @Input() location: Location | null = null;

  ngOnChanges(): void {
    if (!this.location) return;
    this.store.fetchCurrentWeather(this.location);
  }
}
