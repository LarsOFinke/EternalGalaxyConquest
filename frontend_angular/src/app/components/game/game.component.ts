import { Component } from '@angular/core';
import { GameFieldComponent } from '../game_components/game-field/game-field.component';
import { GameService } from '../../services/websocket/game.service';
import { PlayerService } from '../../services/websocket/player.service';

@Component({
  selector: 'app-game',
  imports: [GameFieldComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent {
  game_state: {} = {};
  
  constructor(private gameService: GameService, private playerService: PlayerService) {
    this.playerService.getPlayerTurn("2")
  }

  // ngOnInit() {
  //   this.game_state = this.gameService.getGameStart();
  // }

  start() {
    this.gameService.startGame("test-name");
  }
}
