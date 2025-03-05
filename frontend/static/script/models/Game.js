"use strict";
import { Player } from "./Player.js";
import { inspectTile } from "../egc.js";



export class Game {

    constructor(host, game_state) {
        this.host = host;
        this.game_state = game_state;
        this.__players = this.addPlayers(game_state);
        this.player_count = this.__players.length;
        this.current_player = game_state["current_player"];
        this.__tile_list = game_state["tile_states"];
    }

    fetchTileStates() {
        return this.__tile_list
    }


    addPlayers(game_state) {
        let players = [];

        for (const player of game_state["player_states"]) {
            console.log(player["name"], player["player_id"], player["base_states"]);
            const new_player = new Player(player["name"], player["player_id"], player["base_states"]);
            players.push(new_player);

          }

        return players;
    }


    spawnPlanet(tile, color_id, class_name, sprite_id) {
        tile.classList = `hex color${color_id}`;
    
        const planet_container = document.createElement("div");
        planet_container.className = "planet";
        planet_container.id = tile.id;
        
        const planet = document.createElement("img");
        planet.id = tile.id;
        planet.classList = `${class_name}`;
        planet.src = `/api/sprite/${sprite_id}`;
        planet.addEventListener("click", event => inspectTile(event));
        planet_container.insertAdjacentElement("afterbegin", planet);
    
        tile.insertAdjacentElement("afterbegin", planet_container);
    };
    
    spawn_game_field(tile_states) {
        const game_field = document.getElementById("game_field");
    
        for (const tile_state of tile_states) {
            let new_tile = document.createElement("div");
            new_tile.id = parseInt(tile_state.id);
            new_tile.addEventListener("click", event => inspectTile(event));
    
            if (tile_state.owner_id !== 0) {
                this.spawnPlanet(new_tile, (tile_state.owner_id + 1), "home-planet-sprite", 4);
            } else if (tile_state.owner_id === 0 && tile_state.tile_type === "planet"){
                this.spawnPlanet(new_tile, 1, "center-planet-sprite", 1);
            }else {
                new_tile.classList = "hex color1";
            }
            
            game_field.insertAdjacentElement("beforeend", new_tile);
        }
    };

}
