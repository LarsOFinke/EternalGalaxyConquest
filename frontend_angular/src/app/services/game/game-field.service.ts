import { Injectable } from '@angular/core';
import { UpdateService } from '../websocket/update.service';

@Injectable({
  providedIn: 'root',
})
export class GameFieldService {
  constructor(private updateService: UpdateService) {}

  spawnGameField() {}

  updateGameField() {}
}
