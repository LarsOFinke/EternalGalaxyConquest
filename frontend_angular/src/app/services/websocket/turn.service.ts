import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root',
})
export class TurnService {
  constructor(private socketService: SocketService) {}

  nextTurn(): void {
    this.socketService.emitEvent('next_turn', {});
  }

  // Use the socket service to listen for a specific event
  getPlayerTurn(playerId: string) {
    this.socketService.listenToEvent('your_turn');
    this.socketService.getEventObservable().subscribe((data) => {
      console.log('Received update event data:', data);
      // Handle the incoming data
    });
  }
  // getPlayerTurn(playerId: string): void {
  //   this.socket.on('your_turn', (data: { player: string }) => {
  //     console.log(data);
  //     if (data.player === playerId) {
  //       // Notify the player that it's their turn
  //       alert('Your turn');
  //     }
  //   });
  // }

  disconnect(): void {
    this.socketService.disconnect();
  }
}
