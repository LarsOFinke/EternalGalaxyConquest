import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { socket_url } from '../../main';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket = io(`${socket_url}`, {})
  constructor() { }

  getMessages() {
    return new Observable(observer => {
      this.socket.on("message", message => {
        observer.next(message);
      })

      return () => {
        this.socket.disconnect();
      }
    })
  }
}
