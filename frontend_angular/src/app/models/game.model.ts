import { GameInterface } from '../interfaces/game';
import { GameFieldService } from '../services/game/game-field.service';

export class Game implements GameInterface {
  
  constructor(public host: string, public gameState: {}) {}

  

  updateGameState(data: {game_state: {}}) {
    console.log("Received data for game-state-update: ", data);
  }
}
