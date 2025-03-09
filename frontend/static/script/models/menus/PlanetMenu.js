"use strict";
import { game } from "../../egc.js";
import { SettlementMenu } from "./SettlementMenu.js";
import { sendPlayerActions } from "../../egc.js";



export class PlanetMenu {
    constructor(tile_menu_container, tile) {
        this.tile = tile;
        this.createPlanetMenu(tile_menu_container, tile);
    }


    changePlanetName(event) {
        event.preventDefault();
        const new_name = document.getElementById("planet-name").value;

        const payload = {
            "category": "locations",
            "location": ["bases",],
            "target": this.tile.tile_content.base_id,
            "action": "Change Name",
            "context": [,]
        };
        
        this.tile.tile_content.planet_name = new_name;
        sendPlayerActions(payload);
    }



    foundNewSettlement(event) {
        event.preventDefault();

    }

    spawnFoundSettlementMenu(event) {
        event.preventDefault();

        const found_settlement_menu_container = document.createElement("div");
        found_settlement_menu_container.id = "found-settlement-menu-container";
        found_settlement_menu_container.className = "bordered";
        const found_settlement_menu_header = document.createElement("h4");
        found_settlement_menu_header.textContent = "Siedlungsgründung";
        found_settlement_menu_container.insertAdjacentElement("afterbegin", found_settlement_menu_header);

        const close_btn = document.createElement("button");
        close_btn.classList = "close-btn bordered";
        close_btn.textContent = "X";
        close_btn.addEventListener("click", this.closeFoundSettlementMenu.bind(this)); // Add bound method
        found_settlement_menu_container.insertAdjacentElement("afterbegin", close_btn);
        
        const found_settlement_name_input_box = document.createElement("div");
        found_settlement_name_input_box.className = "small-input-box";
        const found_settlement_name_input = document.createElement("input");
        found_settlement_name_input.type = "text";
        found_settlement_name_input.id = "new-settlement-name"
        found_settlement_name_input_box.insertAdjacentElement("afterbegin", found_settlement_name_input);
        const found_settlement_btn = document.createElement("button");
        found_settlement_btn.id = "found-settlement-btn";
        found_settlement_btn.className = "btn-small";
        found_settlement_btn.textContent = "Gründen";
        found_settlement_btn.addEventListener("click", event => this.foundNewSettlement(event));
        found_settlement_name_input_box.insertAdjacentElement("beforeend", found_settlement_btn);
        found_settlement_menu_container.insertAdjacentElement("beforeend", found_settlement_name_input_box);

        document.getElementById("next-round").insertAdjacentElement("afterend", found_settlement_menu_container);

    }

    spawnFoundSettlementMenuButton() {
        const found_settlement_menu_btn = document.createElement("button");
        found_settlement_menu_btn.id = "found-settlement-menu-btn";
        found_settlement_menu_btn.className = "btn-small";
        found_settlement_menu_btn.textContent = "Neue Siedlung gründen";
        found_settlement_menu_btn.addEventListener("click", event => this.spawnFoundSettlementMenu(event));

        return found_settlement_menu_btn;
    }
    

    spawnSettlementsContainer(tile) {
        const settlements_container = document.createElement("div");
        settlements_container.id = "settlements-container";
        settlements_container.className = "centered";

        game.getPlayers()[tile.owner_id - 1].getBases().forEach(base => {
            if (base.base_id === tile["tile_content"].base_id) {
                base.getSettlements().forEach(settlement => {
                    const settlements_input_box = document.createElement("div");
                    settlements_input_box.className = "small-input-box";

                    const settlements_lbl = document.createElement("label");
                    settlements_lbl.textContent = settlement.name;
                    settlements_input_box.insertAdjacentElement("beforeend", settlements_lbl);

                    const settlements_btn = document.createElement("button");
                    settlements_btn.className = "btn-small";
                    settlements_btn.textContent = "Ansehen";
                    settlements_btn.addEventListener("click", event => {
                        event.preventDefault();
                        const sm = new SettlementMenu(tile, base.base_id, settlement);
                    });
                    settlements_input_box.insertAdjacentElement("beforeend", settlements_btn),
                    settlements_container.insertAdjacentElement("beforeend", settlements_input_box);
                })
            }
        })
        
        return settlements_container;
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

    createPlanetMenu(tile_menu_container, tile) {
        const tile_name = document.createElement("h4");
        tile_name.textContent = tile.tile_name;
        tile_menu_container.insertAdjacentElement("beforeend", tile_name);

        const planet_name_container = this.spawnPlanetNameContainer(tile);
        tile_menu_container.insertAdjacentElement("beforeend", planet_name_container);

        const settlements_container = this.spawnSettlementsContainer(tile);
        tile_menu_container.insertAdjacentElement("beforeend", settlements_container);

        const found_settlement_menu_btn = this.spawnFoundSettlementMenuButton(tile);
        tile_menu_container.insertAdjacentElement("beforeend", found_settlement_menu_btn);
    }



    closeFoundSettlementMenu() {
        // Remove the tile menu container
        const found_settlement_menu_container = document.getElementById("found-settlement-menu-container");
        if (found_settlement_menu_container) {
            found_settlement_menu_container.remove();
        }
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
            btn.removeEventListener("click", this.closeFoundSettlementMenu.bind(this))
        });

    }
}
