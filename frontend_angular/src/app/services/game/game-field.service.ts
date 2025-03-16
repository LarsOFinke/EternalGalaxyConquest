import { Injectable } from '@angular/core';
import { UpdateService } from '../websocket/update.service';
import { Game } from '../../models/game.model';

@Injectable({
  providedIn: 'root',
})
export class GameFieldService {
  private gameInstance: Game | null = null;
  constructor(private updateService: UpdateService) {}

  setupService(gameInstance: Game) {
    this.gameInstance = gameInstance;
    console.log(
      'GameFieldService set up with game-instance: ',
      this.gameInstance
    );
  }


}
