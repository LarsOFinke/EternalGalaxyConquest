import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root',
})
export class TurnService {
  constructor(private socketService: SocketService) {}

  nextTurn(host: string, playerId: string): void {
    this.socketService.emitEvent('next_turn', {
      host: host, 
      player: playerId
  });
  }

  // Listen for the your-turn-event and compare the result with own Player-ID
  getPlayerTurn(playerId: string): void {
    this.socketService.listenToEvent('your_turn');
    this.socketService
      .getEventObservable()
      .subscribe((data: { player: string }) => {
        console.log('Received your-turn data:', data);

        if (data.player === playerId) {
          alert('Your turn');
        }
      });
  }

  disconnect(): void {
    this.socketService.stopListeningToEvent('your_turn');
  }
}
