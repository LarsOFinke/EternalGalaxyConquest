"use strict";
import { game, sendPlayerActions } from "../egc.js";



export class TileMenu {
    constructor(event) {
        this.spawnTileMenu(event);
    }


    changePlanetName(event) {
        event.preventDefault();
    
    };
    
    
    buildBuildersHut(event) {
        event.preventDefault();
    
        // ADD CITY SELECTION FOR PAYLOAD // 
        const payload = {
            "category": "locations",
            "location": ["settlements", "admin's Planet"],
            "target": "Hauptstadt",
            "action": "Build",
            "context": ["Builders Hut",]
        };
    
        sendPlayerActions(payload)
    };
    
    
    spawnBuildMenu() {
        // SPAWN OVERLAY CONTAINER + CORE ELEMENTS //
        const build_menu_container = document.createElement("div");
        build_menu_container.id = "build-menu-container";
        build_menu_container.className = "bordered";
        const build_menu_header = document.createElement("h4");
        build_menu_header.id = "build-menu-header";
        build_menu_header.textContent = "Baumenü";
        build_menu_container.insertAdjacentElement("afterbegin", build_menu_header);
        const close_btn = document.createElement("button");
        close_btn.classList = "close-btn bordered";
        close_btn.textContent = "X";
        close_btn.addEventListener("click", e => document.getElementById("build-menu-container").remove());
        build_menu_container.insertAdjacentElement("afterbegin", close_btn);
        
        // HOME-PLANET MENU //
        const build_builders_hut_input_box = document.createElement("div");
        build_builders_hut_input_box.className = "small-input-box";
        const build_builders_hut_lbl = document.createElement("label");
        build_builders_hut_lbl.id = "build-builders-hut-lbl";
        build_builders_hut_lbl.textContent = "Bauhütte";
        build_builders_hut_input_box.insertAdjacentElement("afterbegin", build_builders_hut_lbl);
        const build_builders_hut_btn = document.createElement("button");
        build_builders_hut_btn.id = "build-builders-hut-btn";
        build_builders_hut_btn.className = "btn-small";
        build_builders_hut_btn.textContent = "Bauen";
        build_builders_hut_btn.addEventListener("click", event => this.buildBuildersHut(event));
        build_builders_hut_input_box.insertAdjacentElement("beforeend", build_builders_hut_btn);
        build_menu_container.insertAdjacentElement("beforeend", build_builders_hut_input_box);
    
        // APPEND BUILD-MENU TO THE FRONTEND //
        document.getElementById("next-round").insertAdjacentElement("afterend", build_menu_container);
    
    
    };
    
    
    createPlanetTileContextMenu(tile_menu_container, tile) {
        const planet_name_container = document.createElement("div");
        planet_name_container.id = "planet-name-container";
        planet_name_container.className = "centered";
    
        const planet_name_label = document.createElement('label');
        planet_name_label.setAttribute("for", "planet-name");
        planet_name_label.textContent = "Name des Planeten:";
        planet_name_container.insertAdjacentElement("beforeend", planet_name_label);
    
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
    
        tile_menu_container.insertAdjacentElement("beforeend", planet_name_container);
    
        const build_menu_btn = document.createElement("button");
        build_menu_btn.id = "build-menu-btn";
        build_menu_btn.className = "btn-small";
        build_menu_btn.textContent = "Baumenü";
        build_menu_btn.addEventListener("click", event => this.spawnBuildMenu(event));
        tile_menu_container.insertAdjacentElement("beforeend", build_menu_btn);
    
    };
    
    spawnTileContextMenu(tile_menu_container, tile) {
        const tile_menu_header = document.createElement("h4");
        tile_menu_header.textContent = tile.tile_content.tile_name;
        tile_menu_container.insertAdjacentElement("afterbegin", tile_menu_header);
    
        switch (tile.tile_type) {
            case "planet":
                this.createPlanetTileContextMenu(tile_menu_container, tile) 
    
        }
        
    };
    
    
    spawnTileMenu(event) {
        let tile_menu_container = document.getElementById("tile-menu-container");
        if (tile_menu_container !== null) {
            tile_menu_container.remove();
        }
    
        // SPAWN OVERLAY CONTAINER + CORE ELEMENTS //
        tile_menu_container = document.createElement("div");
        tile_menu_container.id = "tile-menu-container";
        tile_menu_container.className = "bordered";
        const close_btn = document.createElement("button");
        close_btn.classList = "close-btn bordered";
        close_btn.textContent = "X";
        close_btn.addEventListener("click", e => document.getElementById("tile-menu-container").remove());
        tile_menu_container.insertAdjacentElement("afterbegin", close_btn);
        document.getElementById("next-round").insertAdjacentElement("afterend", tile_menu_container);
    
        // SEARCH THE SELECTED TILE IN THE GAME-OBJECT //
        for (let tile of game.fetchTileStates()) {
            if (parseInt(tile.id) === parseInt(event.srcElement.id)) {
                this.spawnTileContextMenu(tile_menu_container, tile);
                
            }
        }
    };
}
