"use strict";
import { Player } from "./player.js";



export class Game {

    constructor(game_state, tile_list = []) {
        this.game_state = game_state;
        this.__players = this.addPlayers(game_state);
        this.player_count = this.__players.length;
        this.current_player = 1;
        this.__tile_list = tile_list;
        if (this.__tile_list.length === 0) {
            this.insertDefaultTiles();
        }
        
        this.running = false;
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

    insertDefaultTiles() {
        for (let i=1; i<=12; i++) {
            if (i === 2) {
                this.__tile_list.push({
                    tile_id: i,
                    tile_type: "home_planet",
                    owner: this.__players[0],
                    tile_content: {
                        tile_name: `Heimat von ${this.__players[0].name}`,
                        planet_name: `${this.__players[0].name}'s Planet`
                    }
                });
            } else if (i === 11) {
                this.__tile_list.push({
                    tile_id: i,
                    tile_type: "home_planet",
                    owner: this.__players[1],
                    tile_content: {
                        tile_name: `Heimat von ${this.__players[1].name}`,
                        planet_name: `${this.__players[1].name}'s Planet`
                    }
                });
            } else {
                this.__tile_list.push({
                    "tile_id": i,
                    "tile_type": "space",
                    "owner": "free",
                    "tile_content": {}
                });
            }
        }
        
    }

}
