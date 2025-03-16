import { GameInterface } from '../interfaces/game';

export class Game implements GameInterface {
  constructor(public host: string, public gameState: {}) {}

  updateGameState(data: {game_state: {}}) {
    console.log("Received data for game-state-update: ", data);
  }
}
