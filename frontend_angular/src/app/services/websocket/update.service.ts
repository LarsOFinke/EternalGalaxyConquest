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

  // Listen for the game-update-event and return the game-state
  getGameUpdate(): void {
    this.socketService.listenToEvent('game_update');
    this.socketService
      .getEventObservable()
      .subscribe((data: { game_state: {} }) => {
        console.log('Received update event data:', data);
      });
  }
}
