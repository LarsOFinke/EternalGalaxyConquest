import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private socketService: SocketService) {}

  registerPlayer(username: string): void {
    this.socketService.emitEvent('register_player', { user: username });
  }

  startGame(username: string): void {
    this.socketService.emitEvent('start_game', { user: username });
  }

  // Stop listening to the event
  stopListeningForUpdates() {
    this.socketService.stopListeningToEvent('update-event');
  }

  disconnect(): void {
    this.socketService.disconnect();
  }
}
