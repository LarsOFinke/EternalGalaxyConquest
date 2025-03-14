import { GameService } from './game.service';

export class GameModel {
  constructor(private gameService: GameService) {}

  start() {
    this.gameService.sendMessage('start');
  }
}
