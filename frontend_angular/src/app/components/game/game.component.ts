import { Component } from '@angular/core';
import { GameFieldComponent } from '../game_components/game-field/game-field.component';
import { GameService } from '../../services/websocket/game.service';
import { PlayerService } from '../../services/websocket/player.service';
import { TurnService } from '../../services/websocket/turn.service';

@Component({
  selector: 'app-game',
  imports: [GameFieldComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent {
  game_state: {} = {};

  constructor(
    private gameService: GameService,
    private playerService: PlayerService,
    private turnService: TurnService
  ) {}

  ngOnInit(): void {
    this.gameService.registerPlayer("test-name");
    this.gameService.getNewGameStart();
    this.turnService.getPlayerTurn("2");
  }

  ngOnDestroy(): void {
    // CLEAN UP SOCKET-SERVICE CONNECTIONS //
    this.gameService.disconnect();
    this.playerService.disconnect();
    this.turnService.disconnect();
  }

  start() {
    this.gameService.startGame('test-name');
  }
}
