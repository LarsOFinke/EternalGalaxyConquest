"use strict";
import { Player } from "./Player.js";
import { Planet } from "./locations/Planet.js";
import { sendPlayerActions } from "../egc.js"



export class Game {

    constructor(host, game_state) {
        this.host = host;
        this.__own_player_id = 0;
        this.game_state = game_state;
        this.__players = this.addPlayers(game_state["player_states"]);
        this.player_count = this.__players.length;
        this.current_player = game_state["current_player"];
        this.__tile_list = game_state["tile_states"];
        this.__unclaimed_planets = this.addInitialUnclaimedPlanets(game_state);
    }

    fetchTileStates() {
        return this.__tile_list
    }


    addPlayers(player_states) {
        let players = [];

        for (const player_state of player_states) {
            players.push(new Player(player_state["name"], player_state["player_id"], player_state["base_states"]));

            if (player_state["name"] === username) {
                this.__own_player_id = player_state["player_id"];
            }

          }

        return players;
    }

    addInitialUnclaimedPlanets(game_state) {
        let unclaimed_planets = [];

        for (let planet of game_state["unclaimed_planets"]) {
            unclaimed_planets.push(new Planet(planet.tile_id, planet.base_id, planet.name, planet.settlement_states))
        }
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
        planet.addEventListener("click", event => this.inspectTile(event));
        planet_container.insertAdjacentElement("afterbegin", planet);
    
        tile.insertAdjacentElement("afterbegin", planet_container);
    }
    
    spawn_game_field(tile_states) {
        const game_field = document.getElementById("game_field");
    
        for (const tile_state of tile_states) {
            let new_tile = document.createElement("div");
            new_tile.id = parseInt(tile_state.id);
            new_tile.addEventListener("click", event => this.inspectTile(event));
    
            if (tile_state.owner_id !== 0) {
                this.spawnPlanet(new_tile, (tile_state.owner_id + 1), "home-planet-sprite", 4);
            } else if (tile_state.owner_id === 0 && tile_state.tile_type === "planet"){
                this.spawnPlanet(new_tile, 1, "center-planet-sprite", 1);
            }else {
                new_tile.classList = "hex color1";
            }
            
            game_field.insertAdjacentElement("beforeend", new_tile);
        }
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
        for (let tile of this.fetchTileStates()) {
            if (parseInt(tile.id) === parseInt(event.srcElement.id)) {
                this.spawnTileContextMenu(tile_menu_container, tile);
                
            }
        }
    };
    
    
    inspectTile(event) {
        event.preventDefault();
        this.spawnTileMenu(event);
    
    };
    


    addBuildingToPlayer(player_id, base_id, settlement_id, building) {
        this.__players.forEach(player => {
            if (player.id === player_id) {
                player.getBases().forEach(base => {
                    if (base.base_id === base_id) {
                        base.getSettlements().forEach(settlement => {
                            if (settlement.settlement_id === settlement_id) {
                                settlement.addNewBuilding(building);
                            }
                        })
                    }
                })
            }
        })
    }

    // Utility function to check if a building ID exists in the game
    checkIfBuildingInGame(target) { 
        return this.__players.some(player =>
            player.getBases().some(base =>
                base.getSettlements().some(settlement =>
                    settlement.getBuildings().some(building =>
                        building.getBuildingId() === target
                    )
                )
            )
        );
    }

    // Refactored updateGameState function
    updateGameState(game_state) {
        game_state.player_states.forEach(player => {
            player.base_states.forEach(base => {
                base.settlement_states.forEach(settlement => {
                    settlement.building_states.forEach(building => {
                        if (!this.checkIfBuildingInGame(building.building_id)) {
                            this.addBuildingToPlayer(player.player_id, base.base_id, settlement.settlement_id, building);
                        }
                    });
                });
            });
        });
    }

}



       