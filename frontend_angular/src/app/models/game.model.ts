import { GameInterface } from '../interfaces/game';
import { Tile } from '../interfaces/tile';

export class Game implements GameInterface {
  
  constructor(public host: string, public gameState: {tile_states:Tile[]}) {}

  getTileStates(): Tile[] {
    return this.gameState.tile_states;
  }

  updateGameState(data: {game_state: {}}) {
    console.log("Received data for game-state-update: ", data);
  }
}
