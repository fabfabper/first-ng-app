import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Event } from '../model/event.type';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  http = inject(HttpClient);
  baseUrl = environment.apiUrl;

  getEventsFromApi() {
    const url = this.baseUrl + '/events';
    console.log('Getting events from:', url);
    return this.http.get<Array<Event>>(url);
  }
}
