import { Pipe, PipeTransform } from '@angular/core';
import { User } from '@farmapp/user/core';

@Pipe({
  name: 'userInitials',
  standalone: true,
})
export class UserInitialsPipe implements PipeTransform {
  transform({ firstName, lastName }: User): string {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  }
}
