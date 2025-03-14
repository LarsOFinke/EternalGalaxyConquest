import { inject, Injectable } from '@angular/core';
import { WebSocketService } from '../../../services/websocket.service';
import { socket_url } from '../../../../main';

@Injectable({
  providedIn: 'root',
})
export class GameFieldService {
  private websocketService = inject(WebSocketService);

  start() {
    this.websocketService.connect(`${socket_url}`);
  }

  sendMessage() {
    this.websocketService.sendMessage('Hello from Angular!');
  }
}
