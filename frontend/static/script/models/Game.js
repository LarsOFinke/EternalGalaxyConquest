"use strict";



class Game {
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
        for (let i=1; i<=77; i++) {
            if (i === 34) {
                this.tile_list.push({
                    "tile": i,
                    "tile_type": "home_planet",
                    "owner": this.players[0],
                    "tile_content": {
                        "planet": "'AI' Home Planet"
                    }
                });
            } else if (i === 44) {
                this.tile_list.push({
                    "tile": i,
                    "tile_type": "home_planet",
                    "owner": this.players[1],
                    "tile_content": {
                        "planet": "'Player 1' Home Planet"
                    }
                });
            } else {
                this.tile_list.push({
                    "tile": i,
                    "tile_type": "space",
                    "owner": "free",
                    "tile_content": {}
                });
            }
        }
        
    }

}
