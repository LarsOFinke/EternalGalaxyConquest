import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { socket_url } from '../../../main';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private socket = io(socket_url);

  constructor() {
    // Listen for the 'welcome' message from the server //
    this.socket.on('welcome', (data: { message: string }) => {
      console.log(data.message); // REPLACE WITH UI INTERACTION TO SHOW START-BUTTON etc //

      this.registerPlayer('test-name');
    });
  }

  registerPlayer(username: string): void {
    this.socket.emit('register_player', { user: username });
  }

  getPlayerTurn(playerId: string): void {
    this.socket.on('your_turn', (data: { playerId: string }) => {
      if (data.playerId === playerId) {
        // Notify the player that it's their turn
        alert("Your turn");
      }
    });
  }

  sendPlayerAction(action: object): void {
    this.socket.emit('player_action', action);
  }
}
