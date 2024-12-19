import { Component, inject } from '@angular/core';
import { Event as EventComponent } from '../model/event.type';
import { SignalRService } from '../services/signalr.service';
import { Router } from '@angular/router';
import { Rescuer } from '../model/rescuer';

@Component({
  selector: 'app-events',
  imports: [],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent {
  router = inject(Router);
  signalRService = inject(SignalRService);

  onEventClick(event: EventComponent): void {
    console.log('Event clicked:', event);
    this.router.navigate(['/events', event.id]);
  }

  public concatRescuers(messages: Rescuer[]): string {
    const rescuerNames = messages.map((message) => message.name);
    const distinctRescuerNames = Array.from(new Set(rescuerNames));
    return distinctRescuerNames.join(', ');
  }
}
