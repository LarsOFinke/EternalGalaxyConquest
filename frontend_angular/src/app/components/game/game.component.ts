import { Component } from '@angular/core';
import { GameFieldComponent } from "../game_components/game-field/game-field.component";

@Component({
  selector: 'app-game',
  imports: [GameFieldComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {

}
