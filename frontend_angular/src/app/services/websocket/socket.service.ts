// socket.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { socket_url } from '../../../main';

@Injectable({
  providedIn: 'root', // This allows it to be injected in any service
})
export class SocketService {
  private socket: Socket;
  private eventSubject: Subject<any> = new Subject();

  constructor() {
    this.socket = io(socket_url); // Replace with your server URL
  }

  // Listen for an event once
  listenToEventOnce(
    eventName: string,
    callback: (...args: any[]) => void
  ): void {
    this.socket.once(eventName, callback); // Will trigger once and then remove the listener
  }

  // Method to listen to an event and emit data via the Subject
  listenToEvent(eventName: string) {
    this.socket.on(eventName, (data) => {
      this.eventSubject.next(data); // Emit the data to subscribers
    });
  }

  // Method to stop listening to an event
  stopListeningToEvent(eventName: string) {
    this.socket.off(eventName); // Removes the listener for the event
  }

  // Observable to subscribe to the event data
  getEventObservable() {
    return this.eventSubject.asObservable();
  }

  // Emit data to the server
  emitEvent(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  disconnect(): void {
    this.socket.removeAllListeners();
    this.socket.disconnect();
    console.log('Socket disconnected and all listeners removed');
  }
}
