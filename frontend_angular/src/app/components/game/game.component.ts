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
  username: string = 'test-name';
  host: string = '';
  playerId: string = '';
  gameStarted: boolean = false;
  gameState: {} = {};

  constructor(
    private gameService: GameService,
    private playerService: PlayerService,
    private turnService: TurnService
  ) {}

  ngOnInit(): void {
    this.gameService.registerPlayer(this.username);
    this.gameService.getNewGameStart((data) => this.initializeNewGame(data));
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

  initializeNewGame(data: {host: string; game_state: {player_states: [{name: string, player_id: string}]}}) {
    this.host = data.host;
    data["game_state"]["player_states"].forEach(e => {
      if (e.name === this.username) {
        this.playerId = e.player_id;
      }
    });
    this.gameState = data.game_state;
    this.gameStarted = true;
    console.log('Game started:', this.host, this.playerId, this.gameState);
    this.turnService.getPlayerTurn(this.playerId);
  }

  nextRound() {
    this.turnService.nextTurn(this.host, this.playerId);
  }
}
