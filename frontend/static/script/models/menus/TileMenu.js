"use strict";
import { game } from "../../egc.js";
import { PlanetMenu } from "./PlanetMenu.js";



export class TileMenu {
    constructor(event) {
        this.spawnTileMenu(event);
    }

    
    spawnTileContextMenu(tile_menu_container, tile) {
        const tile_menu_header = document.createElement("h4");
        tile_menu_header.textContent = tile.tile_content.tile_name;
        tile_menu_container.insertAdjacentElement("afterbegin", tile_menu_header);

        switch (tile.tile_type) {
            case "planet":
                const pm = new PlanetMenu(tile_menu_container, tile);
                break;
        }
    }

    spawnTileMenu(event) {
        let tile_menu_container = document.getElementById("tile-menu-container");
        if (tile_menu_container !== null) {
            tile_menu_container.remove();
        }

        tile_menu_container = document.createElement("div");
        tile_menu_container.id = "tile-menu-container";
        tile_menu_container.className = "bordered";
        const close_btn = document.createElement("button");
        close_btn.classList = "close-btn bordered";
        close_btn.textContent = "X";
        close_btn.addEventListener("click", this.closeTileMenu.bind(this)); // Add bound method
        tile_menu_container.insertAdjacentElement("afterbegin", close_btn);
        document.getElementById("next-round").insertAdjacentElement("afterend", tile_menu_container);

        for (let tile of game.fetchTileStates()) {
            if (parseInt(tile.id) === parseInt(event.srcElement.id)) {
                this.spawnTileContextMenu(tile_menu_container, tile);
            }
        }
    }


    // Thx ChatGPT for showing me how to properly dispose of instances //
    closeTileMenu() {
        // Remove the tile menu container
        const tile_menu_container = document.getElementById("tile-menu-container");
        if (tile_menu_container) {
            tile_menu_container.remove();
        }
    
        // Clean up event listeners (e.g., remove the click listeners from close buttons)
        const closeBtns = document.querySelectorAll('.close-btn');
        closeBtns.forEach(btn => {
            // Here, we are assuming the close button was added via event delegation
            btn.removeEventListener('click', this.closeTileMenu.bind(this));
        });

    }
    
}
