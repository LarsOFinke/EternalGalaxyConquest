import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { socket_url } from '../../../main';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  constructor(private socketService: SocketService) {}

  // Use the socket service to listen for a specific event
  listenForUpdates() {
    this.socketService.listenToEvent('update-event');
    this.socketService.getEventObservable().subscribe((data) => {
      console.log('Received update event data:', data);
      // Handle the incoming data
    });
  }
}
