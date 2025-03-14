import { Component } from '@angular/core';

@Component({
  selector: 'app-game-field',
  imports: [],
  templateUrl: './game-field.component.html',
  styleUrl: './game-field.component.css'
})
export class GameFieldComponent {

}



// spawn_game_field(tile_states) {
//   const game_field = document.getElementById("game_field");

//   for (const tile_state of tile_states) {
//       let new_tile = document.createElement("div");
//       new_tile.id = parseInt(tile_state.id);
//       new_tile.addEventListener("click", event => this.inspectTile(event));

//       if (tile_state.owner_id !== 0) {
//           this.spawnPlanet(new_tile, (tile_state.owner_id + 1), "home-planet-sprite", 4);
//       } else if (tile_state.owner_id === 0 && tile_state.tile_type === "planet"){
//           this.spawnPlanet(new_tile, 1, "center-planet-sprite", 1);
//       }else {
//           new_tile.classList = "hex color1";
//       }
      
//       game_field.insertAdjacentElement("beforeend", new_tile);
//   }
// }