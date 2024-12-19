import { Component, inject, signal } from '@angular/core';
import { SignalRService } from '../../services/signalr.service';
import { ActivatedRoute } from '@angular/router';
import { NgArrayPipesModule } from 'ngx-pipes';
import { RescuerStatusDirective } from '../../directives/rescuer-status.directive';

@Component({
  selector: 'app-event',
  imports: [NgArrayPipesModule, RescuerStatusDirective],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
})
export class EventComponent {
  signalRService = inject(SignalRService);
  route = inject(ActivatedRoute);
  eventId = signal<string>('');

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.eventId.set(params['eventId'] ?? '');
    });
  }
}
