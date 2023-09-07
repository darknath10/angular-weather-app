import { inject } from '@angular/core'
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs';
import { selectUser } from '@farmapp/user';

export const userGuard = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectUser).pipe(
    map((user) => !!user),
    tap((userSet) => {
      if (!userSet) router.navigateByUrl('sign-up');
    }),
  );
}
