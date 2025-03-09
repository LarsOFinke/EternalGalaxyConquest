"use strict";
import { BuildMenu } from "./BuildMenu.js";
import { BuildingMenu } from "./BuildingMenu.js";
import { PopulationMenu } from "./PopulationMenu.js";



export class SettlementMenu {
    constructor(tile, base_id, settlement) {
        this.tile = tile;
        this.base_id = base_id;
        this.settlement = settlement;

        this.spawnSettlementMenu(tile);
    }


    changeSettlementName(event) {
        event.preventDefault();
    }


    spawnBuildMenuButton() {
        const build_menu_btn = document.createElement("button");
        build_menu_btn.classList = "btn-small bottom-right";
        build_menu_btn.textContent = "Baumenü";
        build_menu_btn.addEventListener("click", e => new BuildMenu(this.base_id, this.settlement.settlement_id));

        return build_menu_btn;
    }

    spawnPopulationMenuButton() {
        const population_menu_btn = document.createElement("button");
        population_menu_btn.classList = "btn-small bottom-left";
        population_menu_btn.textContent = "Bevölkerung";
        population_menu_btn.addEventListener("click", e => new PopulationMenu(this.settlement));

        return population_menu_btn;
    }

    spawnBuildingsContainer() {
        const buildings_container = document.createElement("div");
        buildings_container.id = "buildings-container";
        buildings_container.className = "centered";

        this.settlement.getBuildings().forEach(building => {
            const building_input_box = document.createElement("div");
            building_input_box.className = "small-input-box";

            const building_lbl = document.createElement("label");
            building_lbl.textContent = building.name;
            building_input_box.insertAdjacentElement("beforeend", building_lbl);

            const building_btn = document.createElement("button");
            building_btn.className = "btn-small";
            building_btn.textContent = "Ansehen";
            building_btn.addEventListener("click", e => new BuildingMenu(this.base_id, this.settlement, building));
            building_input_box.insertAdjacentElement("beforeend", building_btn),
            buildings_container.insertAdjacentElement("beforeend", building_input_box);
        })
        
        return buildings_container;
    }

    spawnSettlementNameContainer() {
        const settlement_name_container = document.createElement("div");
        settlement_name_container.id = "settlement-name-container";
        settlement_name_container.className = "centered";

        const settlement_name_lbl = document.createElement('label');
        settlement_name_lbl.setAttribute("for", "settlement-name");
        settlement_name_lbl.textContent = "Name der Siedlung:";
        settlement_name_container.insertAdjacentElement("beforeend", settlement_name_lbl);

        const settlement_name_input_box = document.createElement("div");
        settlement_name_input_box.className = "small-input-box";
        const settlement_name_input = document.createElement('input');
        settlement_name_input.type = "text";
        settlement_name_input.id = "settlement-name";
        settlement_name_input.value = this.settlement.name;
        settlement_name_input_box.insertAdjacentElement("beforeend", settlement_name_input);
        const settlement_name_btn = document.createElement("button");
        settlement_name_btn.className = "btn-small";
        settlement_name_btn.textContent = "Bestätigen";
        settlement_name_btn.addEventListener("click", event => this.changeSettlementName(event));
        settlement_name_input_box.insertAdjacentElement("beforeend", settlement_name_btn);
        settlement_name_container.insertAdjacentElement("beforeend", settlement_name_input_box);

        return settlement_name_container;
    }

    spawnSettlementMenu(tile) {
        const settlement_menu_container = document.createElement("div");
        settlement_menu_container.id = "settlement-menu-container";
        settlement_menu_container.className = "bordered";

        const close_btn = document.createElement("button");
        close_btn.classList = "close-btn bordered";
        close_btn.textContent = "X";
        close_btn.addEventListener("click", this.closeSettlementMenu.bind(this)); // Add bound method
        settlement_menu_container.insertAdjacentElement("afterbegin", close_btn);

        const origin_planet = document.createElement("h4");
        origin_planet.textContent = tile.tile_content.planet_name;
        settlement_menu_container.insertAdjacentElement("afterbegin", origin_planet);

        const settlement_name_container = this.spawnSettlementNameContainer();
        settlement_menu_container.insertAdjacentElement("beforeend", settlement_name_container);

        const buildings_container = this.spawnBuildingsContainer();
        settlement_menu_container.insertAdjacentElement("beforeend", buildings_container);

        const population_menu_btn = this.spawnPopulationMenuButton();
        settlement_menu_container.insertAdjacentElement("beforeend", population_menu_btn);

        const build_menu_btn = this.spawnBuildMenuButton();
        settlement_menu_container.insertAdjacentElement("beforeend", build_menu_btn);

        document.getElementById("next-round").insertAdjacentElement("afterend", settlement_menu_container);
    }

    
    closeSettlementMenu() {
        const settlement_menu_container = document.getElementById("settlement-menu-container");
        if (settlement_menu_container) {
            settlement_menu_container.remove();
        }
    }
}
