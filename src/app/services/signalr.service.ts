import { inject, Injectable, OnInit, signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { catchError, Observable } from 'rxjs';
import { Event as EventType } from '../model/event.type';
import { EventDto } from '../model/eventdto.type';
import { Rescuer } from '../model/rescuer';
import { EventsService } from './events.service';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  eventsService = inject(EventsService);
  hubConnection: signalR.HubConnection;
  events = signal<EventType[]>([]);
  endpoint = environment.signalRUrl;

  constructor() {
    this.eventsService
      .getEventsFromApi()
      .pipe(
        catchError((error) => {
          console.error(error);
          throw error;
        })
      )
      .subscribe((ev) => {
        this.events.set(ev);
      });

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.endpoint)
      .build();
    this.startConnection().subscribe();
    this.addReconnectionHandler();
    this.addEventEventListener();
    this.addRescuerEventListener();
  }

  // public getEvent(eventId: string): Event | undefined {
  //   return this.events().find((e) => e.eventId === eventId);
  // }

  // receiveMessage(): Observable<Event> {
  //   return new Observable<Event>((observer) => {
  //     this.hubConnection.on('Message', (sender: string, message: string) => {
  //       observer.next(JSON.parse(message));
  //     });
  //   });
  // }

  // receiveMessageForEvent(eventId: string): Observable<Event> {
  //   return new Observable<Event>((observer) => {
  //     this.hubConnection.on('Message', (sender: string, message: string) => {
  //       if (JSON.parse(message).eventId !== eventId) return;
  //       observer.next(JSON.parse(message));
  //     });
  //   });
  // }

  // sendMessage(message: string): void {
  //   this.hubConnection.invoke('SendMessage', message);
  // }

  private addRescuerEventListener = () => {
    this.hubConnection.on('Rescuer', (sender: string, message: string) => {
      console.log('Rescuer message received:', message);
      let newMessage: Rescuer = JSON.parse(message);
      let existingEvent = this.events().find(
        (e) => e.id === newMessage.eventId
      );
      if (existingEvent) {
        const rescuerIndex = existingEvent.rescuers.findIndex(
          (rescuer) => rescuer.id === newMessage.id
        );
        if (rescuerIndex !== -1) {
          existingEvent.rescuers[rescuerIndex] = newMessage;
        } else {
          existingEvent.rescuers.push(newMessage);
        }
        this.events.update((events) => {
          return events.map((event) =>
            event.id === existingEvent?.id ? existingEvent : event
          );
        });
      } else {
        console.error(`Event with id ${newMessage.eventId} not found`);
      }
      console.log('Events:', this.events());
    });
  };

  private addEventEventListener = () => {
    this.hubConnection.on('Event', (sender: string, message: string) => {
      console.log('Event message received:', message);
      let receivedDto: EventDto = JSON.parse(message);

      switch (receivedDto.status) {
        case 'Closed':
          this.removeEvent(receivedDto.id);
          return;
        default:
          this.addOrUpdateEvent(receivedDto);
          break;
      }
    });
  };

  private removeEvent(eventId: string): void {
    this.events.update((events) =>
      events.filter((event) => event.id !== eventId)
    );
  }

  private addOrUpdateEvent(receivedDto: EventDto): void {
    let existingEvent = this.events().find((e) => e.id === receivedDto.id);
    if (existingEvent) {
      let newEvent: EventType = {
        ...receivedDto,
        rescuers: existingEvent.rescuers,
      };
      this.events.update((events) => {
        return events
          .filter((event) => event.id !== existingEvent?.id)
          .concat(newEvent);
      });
      console.log('Updated event:', newEvent);
    } else {
      const newEvent: EventType = {
        id: receivedDto.id,
        location: receivedDto.location,
        latitude: receivedDto.latitude,
        longitude: receivedDto.longitude,
        status: receivedDto.status,
        rescuers: [],
      };
      this.events.update((events) => [...events, newEvent]);
      console.log('Added event:', newEvent);
    }
    console.log('Events:', this.events());
  }

  private startConnection(): Observable<void> {
    return new Observable<void>((observer) => {
      if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
        return;
      }

      this.hubConnection
        .start()
        .then(() => {
          console.log('Connection established with SignalR hub');
          this.addReconnectionHandler();
          observer.next();
          observer.complete();
        })
        .catch(async (error) => {
          console.error('Error connecting to SignalR hub:', error);
          observer.error(error);
          await this.reconnect();
        });
    });
  }

  private addReconnectionHandler(): void {
    this.hubConnection.onclose(async () => {
      console.log('Connection lost. Attempting to reconnect...');
      await this.reconnect();
    });
  }

  private async reconnect(): Promise<void> {
    let retries = Number.MAX_VALUE;
    while (retries > 0) {
      try {
        await this.hubConnection.start();
        console.log('Reconnected successfully');
        return;
      } catch (error) {
        retries--;
        console.error(
          `Reconnection attempt failed. Retries left: ${retries}`,
          error
        );
        await new Promise((resolve) => setTimeout(resolve, 5000)); // wait for 5 seconds before retrying
      }
    }
  }
}
