import { Injectable } from '@angular/core';
import { UpdateService } from '../../../services/websocket/update.service';

@Injectable({
  providedIn: 'root',
})
export class GameFieldService {
  constructor(private updateService: UpdateService) {}
}
