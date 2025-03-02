"use strict";



export class Game {
    constructor(players = ["AI", "Player 1"], tile_list = []) {
        this.players = players;
        this.tile_list = tile_list;
        if (this.tile_list.length === 0) {
            this.insertDefaultTiles();
        }
        this.player_count = players.length;
        this.current_player = 1;
        this.game_state = {};
        this.running = false;
    }


    insertDefaultTiles() {
        for (let i=1; i<=12; i++) {
            if (i === 2) {
                this.tile_list.push({
                    tile_id: i,
                    tile_type: "home_planet",
                    owner: this.players[0],
                    tile_content: {
                        tile_name: "Home of 'AI'",
                        planet_name: "'AIs' Planet"
                    }
                });
            } else if (i === 11) {
                this.tile_list.push({
                    tile_id: i,
                    tile_type: "home_planet",
                    owner: this.players[1],
                    tile_content: {
                        tile_name: "Home of 'Player 1'",
                        planet_name: "'Player 1s' Planet"
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
