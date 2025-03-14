import { Injectable } from '@angular/core';
import { WebSocketService } from '../../services/websocket.service';
import { socket_url } from '../../../main';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private messages: string[] = [];

  constructor(private wsService: WebSocketService) {}

  ngOnInit(): void {
    this.wsService.connect(`${socket_url}`).subscribe({
      next: (message) => {
        this.messages.push(message);
        console.log(this.messages);
      },
      error: (err) => console.error('WebSocket Error: ', err),
      complete: () => console.log('WebSocket connection closed'),
    });
  }

  sendMessage(message: string): void {
    this.wsService.sendMessage(message);
  }

  ngOnDestroy(): void {
    this.wsService.close();
  }
}
