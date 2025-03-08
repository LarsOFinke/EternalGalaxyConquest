"use strict";
import { BuildMenu } from "./BuildMenu.js";



export class SettlementMenu {
    constructor(tile, settlement) {
        this.tile = tile;
        this.settlement = settlement;

        this.spawnSettlementMenu(tile);
    }



    spawnBuildMenuButton() {
        const build_menu_btn = document.createElement("button");
        build_menu_btn.id = "build-menu-btn";
        build_menu_btn.className = "btn-small";
        build_menu_btn.textContent = "Baumenü";
        build_menu_btn.addEventListener("click", event => new BuildMenu(event));

        return build_menu_btn;
    }


    changeSettlementName(event) {
        event.preventDefault();
    }

    spawnBuildingsContainer() {
        const buildings_container = document.createElement("div");
        buildings_container.id = "buildings-container";
        buildings_container.className = "centered";

        // BUILDINGS-TABLE //
        const buildings_table = document.createElement("table");
        buildings_table.className = "centered";
        const buildings_table_head = document.createElement("thead")
        const buildings_table_head_building = document.createElement("th");
        buildings_table_head_building.textContent = "Gebäude";
        buildings_table_head.insertAdjacentElement("beforeend", buildings_table_head_building);
        const buildings_table_head_details = document.createElement("th");
        buildings_table_head_details.textContent = "Details";
        buildings_table_head.insertAdjacentElement("beforeend", buildings_table_head_details);
        buildings_table.insertAdjacentElement("afterbegin", buildings_table_head);
        buildings_container.insertAdjacentElement("beforeend", buildings_table);

        console.log(this.settlement);
        // CREATE A NEW ROW IN THE TABLE FOR EACH BUILDING FETCHED //
        this.settlement.getBuildings().forEach(building => {
            const new_row = document.createElement("tr");
            const building_name = document.createElement("td");
            building_name.textContent = building.name;
            new_row.insertAdjacentElement("beforeend", building_name);
            const building_details = document.createElement("td");
            building_details.textContent = "Details";
            new_row.insertAdjacentElement("beforeend", building_details);
            buildings_table.insertAdjacentElement("beforeend", new_row);
        })
        

        return buildings_container;
    }

    spawnSettlementNameContainer(tile) {
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
