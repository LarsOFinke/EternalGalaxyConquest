"use strict";
import { Player } from "./player.js";
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
            const player_name = player["name"];
            const player_id = player["player_id"];
            const new_player = new Player(player_name, player_id);
            players.push(new_player);

          }

        return players;
    }

    spawnHomePlanet(new_tile, owner_id) {
        new_tile.classList = `hex color${owner_id + 1}`;
    
        const home_planet_container = document.createElement("div");
        home_planet_container.className = "home-planet";
        home_planet_container.id = new_tile.id;
        
        const home_planet = document.createElement("img");
        home_planet.id = new_tile.id;
        home_planet.classList = "home-planet-sprite";
        home_planet.src = "/api/sprite/1";
        home_planet.addEventListener("click", event => inspectTile(event));
        home_planet_container.insertAdjacentElement("afterbegin", home_planet);
    
        new_tile.insertAdjacentElement("afterbegin", home_planet_container);
    };
    
    spawn_game_field(tile_states) {
        const game_field = document.getElementById("game_field");
    
        for (const tile_state of tile_states) {
            let new_tile = document.createElement("div");
            new_tile.id = tile_state.id;
            new_tile.addEventListener("click", event => inspectTile(event));
    
            if (tile_state.tile_type === "home_planet") {
                this.spawnHomePlanet(new_tile, tile_state.owner_id);
            } else {
                new_tile.classList = "hex color1";
            }
    
            game_field.insertAdjacentElement("beforeend", new_tile);
        }
    };

}
