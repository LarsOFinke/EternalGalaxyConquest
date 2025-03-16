import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  constructor(private socketService: SocketService) {}

  getGameUpdate(callback: (data: { game_state: {} }) => void): void {
    this.socketService.listenToEvent(
      'game_update',
      (data: { game_state: {} }) => {
        console.log('Received game-state update: ', data.game_state);
        callback(data);
      }
    );
  }

  disconnect(): void {
    this.socketService.stopListeningToEvent('game_update');
  }
}
