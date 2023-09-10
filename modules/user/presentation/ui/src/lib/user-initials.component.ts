import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Nullable } from '@farmapp/shared/types';
import { User } from '@farmapp/user/core';
import { UserInitialsPipe } from './user-initials.pipe';

@Component({
  selector: 'farm-app-user-initials',
  standalone: true,
  imports: [
    NgIf,
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
  @Input({ required: true }) user: Nullable<User> = null;
}
