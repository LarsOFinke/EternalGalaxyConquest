"use strict";



function spawn_game_field() {
    const game_field = document.getElementById("game_field");

    for (let i=1; i<=77; i++) {
        let new_tile = document.createElement("div");
        new_tile.id = `tile_${i}`;

        if (i === 34) {
            new_tile.classList = "hex color2";
        } else if (i === 44) {
            new_tile.classList = "hex color3";
        } else {
            new_tile.classList = "hex color1";
        }

        game_field.insertAdjacentElement("beforeend", new_tile);
    }
};

spawn_game_field()
