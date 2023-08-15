import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WMO_CODE, mapWmoCode } from './wmo-codes-interpretation';

@Component({
  selector: 'app-weather-code-img',
  standalone: true,
  imports: [
    CommonModule,
    MatTooltipModule,
  ],
  template: `
    <img [src]="wmoCodeImgUrl" [alt]="wmoCodeDescription" [matTooltip]="wmoCodeDescription">
  `,
  styles: [
    `
      :host {
        display: block;
      }
      img {
        @apply w-full h-full bg-gray-600 rounded-full;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherCodeImageComponent implements OnChanges {
  @Input({ required: true }) wmoCode!: number;
  @Input() isDay = true;
  wmoCodeImgUrl!: string;
  wmoCodeDescription!: string;

  ngOnChanges(): void {
    const { description, image } = mapWmoCode(this.wmoCode as WMO_CODE, this.isDay);
    this.wmoCodeDescription = description;
    this.wmoCodeImgUrl = image;
  }
}
