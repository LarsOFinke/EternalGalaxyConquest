import { Component } from '@angular/core';
import { GameFieldComponent } from '../game_components/game-field/game-field.component';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-game',
  imports: [GameFieldComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent {
  messages: string[] = [];
  
  constructor(private websocket: WebsocketService) {}

  ngOnInit() {
    this.websocket.getMessages().subscribe((message: any) => {
      this.messages.push(message);
    });
  }
}
