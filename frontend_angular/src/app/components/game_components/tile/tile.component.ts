import { Component, Input } from '@angular/core';
import { TileMenuComponent } from '../menus/tile-menu/tile-menu.component';
import { Tile } from '../../../interfaces/tile';

@Component({
  selector: 'app-tile',
  imports: [TileMenuComponent],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.css'
})
export class TileComponent {
  @Input({ required: true }) tileState!:Tile;
  selected_tile: string = '';
  show_tile_menu: boolean = false;

  inspectTile(tile_id: string) {
    this.selected_tile = tile_id;
    this.show_tile_menu = true;
  }
  closeTileMenu(): void {
    this.show_tile_menu = false;
    this.selected_tile = '';
  }
}
