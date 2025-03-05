"use strict";
import { Player } from "./Player.js";
import { Planet } from "./locations/Planet.js";
import { inspectTile } from "../egc.js";



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
        planet.addEventListener("click", event => inspectTile(event));
        planet_container.insertAdjacentElement("afterbegin", planet);
    
        tile.insertAdjacentElement("afterbegin", planet_container);
    }
    
    spawn_game_field(tile_states) {
        const game_field = document.getElementById("game_field");
    
        for (const tile_state of tile_states) {
            let new_tile = document.createElement("div");
            new_tile.id = parseInt(tile_state.id);
            new_tile.addEventListener("click", event => inspectTile(event));
    
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


    checkIfBuildingInGame(target) { 
        for (let player of this.__players) {
            for (let base of player.getBases()) {
                for (let settlement of base.getSettlements()) {
                    for (let building of settlement.getBuildings()) {
                        if (building.getBuildingId() === target){
                            return true;
                        }
                        
                    }
                }
            }
        }
    }

    updateGameState(game_state) {


        for (let player of game_state.player_states) {
            for (let base of player.base_states) {
                for (let settlement of base.settlement_states) {
                    for (let building of settlement.building_states) {
                        if (!this.checkIfBuildingInGame(building.building_id)) {
                            console.log("NICHT GEFUNDEN");
                            console.log(building);
                            console.log(player.player_id);
                            // ADD BUILDING TO THE PLAYER
                        }

                    }
                }
            }
        }

    }

}



       