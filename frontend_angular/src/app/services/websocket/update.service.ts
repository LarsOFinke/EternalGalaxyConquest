import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { Tile } from '../../interfaces/tile';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  constructor(private socketService: SocketService) {}

  getGameUpdate(
    callback: (data: { game_state: { tile_states: Tile[] } }) => void
  ): void {
    this.socketService.listenToEvent(
      'game_update',
      (data: { game_state: { tile_states: Tile[] } }) => {
        console.log('Received game-state update: ', data.game_state);
        callback(data);
      }
    );
  }

  disconnect(): void {
    this.socketService.stopListeningToEvent('game_update');
  }
}
