import { inject } from '@angular/core'
import { Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { APP_STORE } from './app-store.token'

export const userGuard = () => {
  const store = inject(APP_STORE);
  const router = inject(Router);

  return store.user$.pipe(
    map((user) => !!user),
    tap((userSet) => {
      if (!userSet) router.navigateByUrl('sign-up');
    }),
  );
}
