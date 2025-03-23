import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tile-menu',
  imports: [],
  templateUrl: './tile-menu.component.html',
  styleUrl: './tile-menu.component.css',
})
export class TileMenuComponent {
  @Input({ required: true }) tile_id!: string;
  @Output() close = new EventEmitter();

  onClose() {
    this.close.emit();
  }
}
