"use strict";
import { Player } from "./Player.js";
import { Planet } from "./locations/Planet.js";
import { TileMenu } from "./menus/TileMenu.js";



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

    getPlayers() {
        return this.__players;
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

    
    
    inspectTile(event) {
        event.preventDefault();
        const tm = new TileMenu(event);
    
    };
    

    convertWorker(player, update) {
        player.getBases().forEach(base => {
            base.getSettlements().forEach(settlement => {
                if (settlement.settlement_id === update.settlement_id) {
                    settlement.setPopulation(update.old_population_id, false);
                    settlement.setFreeWorkers(update.old_population_id, false);
                    
                    settlement.setPopulation(settlement.createPopulationInstance(update));
                }
            })
        });
    };

    changeBaseName(player, update) {
        player.getBases().forEach(base => {
            if (base.base_id === update.base_id) {
                base.name = update.name;
            }
        });
    }

    foundSettlement(player, update) {
        player.getBases().forEach(base => {
            if (base.base_id === update.base_id) {
                base.setSettlement(base.createSettlementInstance(update));
            }
        });
    }

    playerActionUpdate(player, update) {
        player = this.__players[player - 1];

        switch (update.action) {
            case "Convert Worker":
                this.convertWorker(player, update);
            
            case "Change Base Name":
                this.changeBaseName(player, update);

            case "Found Outpost" || "Found City":
                this.foundSettlement(player, update);

        }
    }


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



       