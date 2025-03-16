import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { socket_url } from '../../../main';

@Injectable({
  providedIn: 'root',
})
export class TurnService {
  private socket = io(socket_url);

  nextTurn(): void {
    this.socket.emit('next_turn');
  }

  getCurrentTurn(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('turn_update', (data) => {
        observer.next(data);
      });
    });
  }
}
