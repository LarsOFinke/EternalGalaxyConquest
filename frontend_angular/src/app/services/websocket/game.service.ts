import { Injectable } from '@angular/core';
import { Game } from '../../models/game.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private gameInstance: Game | null = null;
  constructor() {}

  createGameInstance(data: {
    host: string;
    player_id: string;
    game_state: {};
    players: [];
    player_count: number;
    current_player: string;
    tile_list: [];
    unclaimedPlanets: [];
  }) {
    console.log('Attempting to generate Game-Instance...');
    this.gameInstance = new Game(data.host, data.game_state);
    console.log('Game-Instance created: ', this.gameInstance);
  }

  // Get the current game instance (if it exists)
  getGameInstance(): Game | null {
    return this.gameInstance;
  }
}
