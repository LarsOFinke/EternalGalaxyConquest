import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { socket_url } from '../../../main';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  private socket = io(socket_url);

  getGameStateUpdate(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('game_update', (gameState) => {
        observer.next(gameState);
      });
    });
  }
}
