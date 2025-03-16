import { Injectable } from '@angular/core';
import { UpdateService } from '../websocket/update.service';
import { Game } from '../../models/game.model';

@Injectable({
  providedIn: 'root',
})
export class GameFieldService {
  private gameInstance: Game | null = null;
  constructor(private updateService: UpdateService) {}

  spawnGameField(gameInstance: Game, tile_states: [{}]) {
    this.gameInstance = gameInstance;
    console.log('Spawning game-field with tile-states: ', tile_states);
  }

  updateGameField() {}
}
