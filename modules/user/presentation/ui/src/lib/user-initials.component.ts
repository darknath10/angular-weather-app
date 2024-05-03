import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { User } from '@farmapp/user/core';

@Component({
  selector: 'farm-app-user-initials',
  standalone: true,
  imports: [MatTooltip],
  template: `
    <div class="rounded-full p-2 bg-teal-400" [matTooltip]="fullName()">
      <span class="text-lg">{{userInitials()}}</span>
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
  readonly user = input.required<User>();
  readonly fullName = computed(() => `${this.user().firstName} ${this.user().lastName}`);
  readonly userInitials = computed(() => {
    const {firstName, lastName} = this.user();
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  });
}
