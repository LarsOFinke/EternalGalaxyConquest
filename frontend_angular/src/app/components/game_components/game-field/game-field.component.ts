import { Component, inject } from '@angular/core';
import { GameFieldService } from '../../../services/game/game-field.service';
import { TileComponent } from '../tile/tile.component';
import { Tile } from '../../../interfaces/tile';

@Component({
  selector: 'app-game-field',
  imports: [TileComponent],
  templateUrl: './game-field.component.html',
  styleUrl: './game-field.component.css',
})
export class GameFieldComponent {
  public tileStates: Tile[] | null = null;
  constructor(private gameFieldService: GameFieldService) {}

  ngOnInit() {
    this.tileStates = this.gameFieldService.getTileStates();
  }
}

// id 2
// owner "AI"
// owner_id 1

// tile_content
// :
// base_id 1
// planet_name "AI's Planet"
// tile_type "planet"
