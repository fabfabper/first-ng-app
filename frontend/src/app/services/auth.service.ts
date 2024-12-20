import { inject, Injectable, signal } from '@angular/core';
import { User } from '../model/user.type';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  currentUser = signal<User | undefined | null>(undefined);

  public login(username: string, password: string): Observable<User> {
    const url = environment.apiUrl + '/login';
    const body: User = { username, password, email: '', token: '' };
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<User>(url, body, { headers: headers });
  }

  public getUser(): Observable<User> {
    const url = environment.apiUrl + '/user';
    return this.http.get<User>(url);
  }
}
