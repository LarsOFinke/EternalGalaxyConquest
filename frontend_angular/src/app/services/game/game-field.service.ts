import { Injectable } from '@angular/core';
import { UpdateService } from '../websocket/update.service';
import { Game } from '../../models/game.model';
import { Tile } from '../../interfaces/tile';
import { Observable } from 'rxjs';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root',
})
export class GameFieldService {
  private gameInstance: Game | null = null;
  private tileStates!: Tile[];

  constructor(private gameService: GameService) {
    this.gameInstance = gameService.getGameInstance();
    // this.tileStates = gameService.getTileStates();
  }

  assingGameInstance(gameInstance: Game) {
    this.gameInstance = gameInstance;
    console.log(
      'GameFieldService set up with game-instance: ',
      this.gameInstance
    );
    this.tileStates = this.gameInstance.getGameTileStates();
    console.log(
      'GameFieldService set up with tile-states: ',
      this.tileStates
    );
  }

  getTileStates(): Tile[] {
    console.log("CALLING GET TILESTATES",this.tileStates);
    return this.tileStates;
  }

  updateTileStates() {
    if (this.gameInstance !== null) {
      this.tileStates = this.gameInstance.getGameTileStates();
    }
  }
}
