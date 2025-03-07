"use strict";



export class PlanetMenu {
    constructor(tile_menu_container, tile) {
        this.createPlanetTileContextMenu(tile_menu_container, tile);
    }


    changePlanetName(event) {
        event.preventDefault();
    }


    spawnFoundSettlementMenuButton() {
        const found_settlement_menu_btn = document.createElement("button");
        found_settlement_menu_btn.id = "found-settlements-menu-btn";
        found_settlement_menu_btn.className = "btn-small";
        found_settlement_menu_btn.textContent = "Neue Siedlung gründen";
        found_settlement_menu_btn.addEventListener("click", event => this.spawnFoundSettlementMenu(event));

        return found_settlement_menu_btn;
    }

    spawnPlanetNameContainer(tile) {
        const planet_name_container = document.createElement("div");
        planet_name_container.id = "planet-name-container";
        planet_name_container.className = "centered";

        const planet_name_lbl = document.createElement('label');
        planet_name_lbl.setAttribute("for", "planet-name");
        planet_name_lbl.textContent = "Name des Planeten:";
        planet_name_container.insertAdjacentElement("beforeend", planet_name_lbl);

        const planet_name_input_box = document.createElement("div");
        planet_name_input_box.className = "small-input-box";
        const planet_name_input = document.createElement('input');
        planet_name_input.type = "text";
        planet_name_input.id = "planet-name";
        planet_name_input.value = tile.tile_content.planet_name;
        planet_name_input_box.insertAdjacentElement("beforeend", planet_name_input);
        const planet_name_btn = document.createElement("button");
        planet_name_btn.className = "btn-small";
        planet_name_btn.textContent = "Bestätigen";
        planet_name_btn.addEventListener("click", event => this.changePlanetName(event));
        planet_name_input_box.insertAdjacentElement("beforeend", planet_name_btn);
        planet_name_container.insertAdjacentElement("beforeend", planet_name_input_box);

        return planet_name_container;
    }

    createPlanetTileContextMenu(tile_menu_container, tile) {
        const tile_name_lbl = document.createElement("label");
        tile_name_lbl.textContent = tile.tile_name;
        tile_menu_container.insertAdjacentElement("beforeend", tile_name_lbl);

        const planet_name_container = this.spawnPlanetNameContainer(tile);
        tile_menu_container.insertAdjacentElement("beforeend", planet_name_container);

        const found_settlement_menu_btn = this.spawnFoundSettlementMenuButton();
        tile_menu_container.insertAdjacentElement("beforeend", found_settlement_menu_btn);

        
    }


    closePlanetMenu() {
        // Remove the tile menu container
        const tile_menu_container = document.getElementById("tile-menu-container");
        if (tile_menu_container) {
            tile_menu_container.remove();
        }
    
        // Clean up event listeners
        const closeBtns = document.querySelectorAll('.close-btn');
        closeBtns.forEach(btn => {
            btn.removeEventListener('click', this.closeBuildMenu.bind(this));
        });

    }
}
