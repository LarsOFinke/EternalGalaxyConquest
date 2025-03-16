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

  // emit("new_game_started", { "host": host, "game_state": game_state })
  getNewGameStart() {
    // Listen to 'once-event' only once
    this.socketService.listenToEventOnce(
      'new_game_started',
      (data: { host: string; game_state: {} }) => {
        console.log('Received once-event:', data);
        // Process the data
      }
    );
  }

  disconnect(): void {
    // this.socketService.stopListeningToEvent();
  }
}
