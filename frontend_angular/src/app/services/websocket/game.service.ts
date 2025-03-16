import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { socket_url } from '../../../main';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private socket = io(socket_url);

  startGame(username: string): void {
    this.socket.emit('start_game', { user: username });
  }

  endGame(): void {
    this.socket.emit('end_game');
  }

}
