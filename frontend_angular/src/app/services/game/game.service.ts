import { Injectable } from '@angular/core';
import { Game } from '../../models/game.model';
import { UpdateService } from '../websocket/update.service';
import { GameFieldService } from './game-field.service';
import { Tile } from '../../interfaces/tile';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private gameInstance: Game | null = null;
  constructor(private updateService: UpdateService, private gameFieldService: GameFieldService) {}

  createGameInstance(data: { host: string; game_state: {tile_states: Tile[]} }) {
    console.log('Attempting to generate Game-Instance...');
    this.gameInstance = new Game(data.host, data.game_state);
    console.log('Game-Instance created: ', this.gameInstance);

    this.gameFieldService.setupService(this.gameInstance);

    this.updateService.getGameUpdate((data: { game_state: {} }) => {
      if (this.gameInstance !== null) {
        this.gameInstance.updateGameState(data);
      }
    });
  }

  // Get the current game instance (if it exists)
  getGameInstance(): Game | null {
    return this.gameInstance;
  }

  ngOnDestroy() {
    this.updateService.disconnect();
  }

  disconnect() {
    
  }
  
}
