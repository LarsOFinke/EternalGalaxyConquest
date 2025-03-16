import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { socket_url } from '../../../main';

@Injectable({
  providedIn: 'root',
})
export class LobbyService {
  private socket = io(socket_url);

  createGameLobby(): void {
    this.socket.emit('create_lobby');
  }

  joinGameLobby(gameId: string): void {
    this.socket.emit('join_lobby', { gameId });
  }

  gameReady(): void {
    this.socket.emit('ready_to_start');
  }
}
