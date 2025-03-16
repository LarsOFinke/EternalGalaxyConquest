import { GameInterface } from '../interfaces/game';

export class Game implements GameInterface {
  constructor(public host: string, public gameState: {}) {}
}
