import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header />
    <main><router-outlet /></main>
  `,
  styles: [
    `
      main {
        padding: 16px;
      }
    `,
  ],
})
export class AppComponent {
  title = 'first-ng-app';
  authService = inject(AuthService);

  ngOnInit() {
    this.authService.getUser().subscribe((user) => {
      this.authService.currentUser.set(user);
    });
  }
}
