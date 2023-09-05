import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { interval, map } from 'rxjs';

@Component({
  selector: 'farm-app-clock',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-full flex items-center">
      <span>{{now$ | async}}</span>
    </div>
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
export class ClockComponent {
  @Input() timezone = 'UTC';

  now$ = interval(1000).pipe(
    map(() =>
      Intl.DateTimeFormat(undefined, {
        timeZone: this.timezone,
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      }).format(Date.now())),
  );
}
