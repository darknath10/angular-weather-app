import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { WMO_CODE, mapWmoCode } from './wmo-codes-interpretation';

@Component({
  selector: 'farm-app-weather-code-img',
  standalone: true,
  imports: [MatTooltip],
  template: `
    <img
      [src]="mappedWmoCode().image"
      [alt]="mappedWmoCode().description"
      [matTooltip]="mappedWmoCode().description"
    />
  `,
  styles: [
    `
      :host {
        display: block;
      }
      img {
        @apply w-full h-full bg-gray-600 rounded-full;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherCodeImageComponent {
  readonly wmoCode = input.required<number>();
  readonly isDay = input(true);
  readonly mappedWmoCode = computed(() => mapWmoCode(this.wmoCode() as WMO_CODE, this.isDay()));
}
