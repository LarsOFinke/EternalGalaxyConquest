import { Component } from '@angular/core';
import { TileMenuComponent } from '../menus/tile-menu/tile-menu.component';
import { GameFieldService } from '../../../services/game/game-field.service';


@Component({
  selector: 'app-game-field',
  imports: [
    TileMenuComponent
  ],
  templateUrl: './game-field.component.html',
  styleUrl: './game-field.component.css'
})
export class GameFieldComponent {
  selected_tile: string = '';
  show_tile_menu: boolean = false;

  constructor(private gameFieldService: GameFieldService) {}

  spawnGameField(){
    
  }

  inspectTile(tile_id: string) {
    this.selected_tile = tile_id;
    this.show_tile_menu = true;
  }
  closeTileMenu(): void {
    this.show_tile_menu = false;
    this.selected_tile = '';
  }
}
