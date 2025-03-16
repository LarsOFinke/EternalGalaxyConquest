import { Injectable } from '@angular/core';
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
        console.log('Received update for game-state:', data);
      });
  }
}
