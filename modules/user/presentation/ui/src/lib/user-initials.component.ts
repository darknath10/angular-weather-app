import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserInitialsPipe } from './user-initials.pipe';

@Component({
  selector: 'farm-app-user-initials',
  standalone: true,
  imports: [
    CommonModule,
    MatTooltipModule,
    UserInitialsPipe,
  ],
  template: `
    <div *ngIf="user" class="rounded-full p-2 bg-teal-400" [matTooltip]="user.firstName + ' ' + user.lastName">
      <span class="text-lg">{{user | userInitials}}</span>
    </div>
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
export class UserInitialsComponent {
  @Input({ required: true }) user: { firstName: string, lastName: string} | null = null;
}
