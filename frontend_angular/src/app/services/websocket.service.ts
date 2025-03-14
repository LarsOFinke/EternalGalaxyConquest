import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  constructor(private socket: WebSocket) {}

  // Connect to the WebSocket server
  connect(url: string): Observable<any> {
    this.socket = new WebSocket(url);

    return new Observable((observer) => {
      this.socket.onopen = (event) => {
        observer.next('Connection opened');
      };

      this.socket.onmessage = (event) => {
        observer.next(event.data);
      };

      this.socket.onerror = (event) => {
        observer.error(event);
      };

      this.socket.onclose = (event) => {
        observer.complete();
      };
    });
  }

  // Send data to the WebSocket server
  sendMessage(message: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    }
  }

  // Close the WebSocket connection
  close(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}
