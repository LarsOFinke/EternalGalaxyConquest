import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private socketService: SocketService) {}

  sendPlayerAction(action: object): void {
    this.socketService.emitEvent('player_action', action);
  }

  disconnect(): void {
    this.socketService.disconnect();
  }
}
