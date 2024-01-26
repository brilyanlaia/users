import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./components/home-component/home-component.component').then(
        (m) => m.HomeComponentComponent
      ),
  },
  {
    path: 'user/:id',
    loadComponent: () =>
      import('./components/user-detail/user-detail.component').then(
        (m) => m.UserDetailComponent
      ),
  },
];
