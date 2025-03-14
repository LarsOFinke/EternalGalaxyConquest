import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { socket_url } from '../../main';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket = io(`${socket_url}`, {});

  constructor() {
    // Listen for the 'welcome' message from the server //
    this.socket.on('welcome', (data: { message: string }) => {
      console.log(data.message); // REPLACE WITH UI INTERACTION TO SHOW START-BUTTON etc //

      this.register_player('test-name');
    });
  }

  register_player(username: string): void {
    this.socket.emit('register_player', { user: username });
  }

  startGame(username: string): void {
    this.socket.emit('start_game', { user: username });
  }

  //  Listen for game start //
  getGameStart(): Observable<{}> {
    return new Observable((observer) => {
      this.socket.on('new_game_started', (data: { game_state: {} }) => {
        console.log('Game started with state (Backend):');
        console.log(data['game_state']);

        // data['game_state']['player_states'].forEach((e) => {
        //   if (e.name === username) {
        //     window.player_id = e.player_id;
        //   }
        // });

        // game = new Game(data.host, data['game_state']);
        // game.spawn_game_field(data['game_state']['tile_states']);
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }

  // Listen for game updates from the server //
  getGameStateUpdate(): Observable<{}> {
    return new Observable((observer) => {
      this.socket.on('game_update', (game_state: {}) => {
        console.log('Game state updated (Backend):');
        console.log(game_state);

        observer.next(game_state);
        // game.updateGameState(game_state);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }

  // Listen for 'your_turn' event //
  getPlayerTurn(player_id: number) {
    this.socket.on('your_turn', (data: { player: string }) => {
      if (parseInt(data.player) === player_id) {
        // alert(username + ", it's your turn!");
      }
    });
  }

  sendPlayerAction(action: {}): void {
    this.socket.emit('player_input', {
      // host: game.host,
      // player: window.player_id,
      action: action,
    });

    // Listen for the result of the player action //
    this.socket.on(
      'result_player_action',
      (data: { success: boolean; message: string }) => {
        alert(data['message']);
        console.log(data);
        if (data.success) {
          // game.playerActionUpdate(data.player, data.update);
        }
      }
    );
  }

  nextRound() {
    this.socket.emit('next_round', {
      // host: game.host,
      // player: window.player_id,
    });
  }
}
