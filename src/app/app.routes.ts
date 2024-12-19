import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./home/home.component').then((m) => m.HomeComponent);
    },
  },
  {
    path: 'login',
    loadComponent: () => {
      return import('./login/login.component').then((m) => m.LoginComponent);
    },
  },
  {
    path: 'todos',
    loadComponent: () => {
      return import('./todos/todos.component').then((m) => m.TodosComponent);
    },
  },
  {
    path: 'events',
    loadComponent: () => {
      return import('./events/events.component').then((m) => m.EventsComponent);
    },
  },
  {
    path: 'events/:eventId',
    loadComponent: () => {
      return import('./components/event/event.component').then(
        (m) => m.EventComponent
      );
    },
  },
];
