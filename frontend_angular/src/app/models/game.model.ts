import { GameInterface } from '../interfaces/game';
import { Planet } from '../interfaces/planet';
import { Player } from '../interfaces/player';
import { Tile } from '../interfaces/tile';

export class Game implements GameInterface {
  constructor(public host: string, public gameState: {}) {}
}
