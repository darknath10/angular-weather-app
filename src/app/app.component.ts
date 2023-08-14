import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APP_STORE } from './app-store.token';
import { Location, SearchLocationsInputComponent } from './location';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SearchLocationsInputComponent,
  ],
  selector: 'app-root',
  template: `
    <!-- <router-outlet></router-outlet> -->
    <app-search-locations (locationSelected)="onLocationSelected($event)"></app-search-locations>
    <div>
      <pre>{{loc$ | async | json}}</pre>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly store = inject(APP_STORE);
  readonly loc$ = this.store.selectedLocation$;

  onLocationSelected(e: Location) {
    this.store.setSelectedLocation(e);
  }
}
