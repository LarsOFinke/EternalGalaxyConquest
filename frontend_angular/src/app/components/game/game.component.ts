import { Component } from '@angular/core';
import { GameFieldComponent } from '../game_components/game-field/game-field.component';
import { GameManagementService } from '../../services/websocket/game-management.service';
import { PlayerService } from '../../services/websocket/player.service';
import { TurnService } from '../../services/websocket/turn.service';
import { GameService } from '../../services/game/game.service';
import { Tile } from '../../interfaces/tile';

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
  tileStates: Tile[] | null = null;

  constructor(
    private gameManagementService: GameManagementService,
    private gameService: GameService,
    private playerService: PlayerService,
    private turnService: TurnService
  ) {}

  ngOnInit(): void {
    this.gameManagementService.registerPlayer(this.username);
    this.gameManagementService.getNewGameStart((data) =>
      this.initializeNewGame(data)
    );
  }

  ngOnDestroy(): void {
    // CLEAN UP SOCKET-SERVICE CONNECTIONS //
    this.gameManagementService.disconnect();
    this.gameService.disconnect();
    this.playerService.disconnect();
    this.turnService.disconnect();
  }

  start() {
    this.gameManagementService.startGame('test-name');
  }

  initializeNewGame(data: {
    host: string;
    game_state: { player_states: [{ name: string; player_id: string }], tile_states: Tile[] };
    players: [];
  }) {
    this.host = data.host;
    data['game_state']['player_states'].forEach((e) => {
      if (e.name === this.username) {
        this.playerId = e.player_id;
      }
    });
    this.gameService.createGameInstance(data);

    this.gameStarted = true;
    this.turnService.getPlayerTurn(this.playerId);
    console.log('Game fully initialized:', this.host, this.playerId);
  }

  nextRound() {
    this.turnService.nextTurn(this.host, this.playerId);
  }
}
