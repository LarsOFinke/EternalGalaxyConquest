"use strict";
import { Player } from "./player.js";



export class Game {

    constructor(game_state, tile_list = []) {
        this.game_state = game_state;
        this.players = this.addPlayers(game_state);
        this.player_count = this.players.length;
        this.current_player = 1;
        this.tile_list = tile_list;
        if (this.tile_list.length === 0) {
            this.insertDefaultTiles();
        }
        
        this.running = false;
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
                this.tile_list.push({
                    tile_id: i,
                    tile_type: "home_planet",
                    owner: this.players[0],
                    tile_content: {
                        tile_name: `Heimat von ${this.players[0].name}`,
                        planet_name: `${this.players[0].name}'s Planet`
                    }
                });
            } else if (i === 11) {
                this.tile_list.push({
                    tile_id: i,
                    tile_type: "home_planet",
                    owner: this.players[1],
                    tile_content: {
                        tile_name: `Heimat von ${this.players[1].name}`,
                        planet_name: `${this.players[1].name}'s Planet`
                    }
                });
            } else {
                this.tile_list.push({
                    "tile_id": i,
                    "tile_type": "space",
                    "owner": "free",
                    "tile_content": {}
                });
            }
        }
        
    }

}
