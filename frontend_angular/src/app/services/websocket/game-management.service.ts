import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { Tile } from '../../interfaces/tile';

@Injectable({
  providedIn: 'root',
})
export class GameManagementService {
  constructor(private socketService: SocketService) {}

  registerPlayer(user: string): void {
    console.log(`Trying to register: ${user}...`);
    this.socketService.emitEvent('register_player', { user });
    console.log(`${user} registered!`);
  }

  startGame(user: string): void {
    console.log('Attempting to start the game...');
    this.socketService.emitEvent('start_game', { user });
  }

  // This method listens for the event and calls the callback with the data when received
  getNewGameStart(
    callback: (data: {
      host: string;
      player_id: string;
      game_state: { player_states: [{ name: string; player_id: string }], tile_states: Tile[] };
      players: [];
      player_count: number;
      current_player: string;
      tile_list: [];
      unclaimedPlanets: [];
    }) => void
  ): void {
    this.socketService.listenToEventOnce(
      'new_game_started',
      (data: {
        host: string;
        player_id: string;
        game_state: { player_states: [{ name: string; player_id: string }], tile_states: Tile[] };
        players: [];
        player_count: number;
        current_player: string;
        tile_list: [];
        unclaimedPlanets: [];
      }) => {
        console.log('New game started:', data);
        callback(data); // Call the callback with the data received from the event
      }
    );
  }

  disconnect(): void {
    // this.socketService.stopListeningToEvent();
  }
}
