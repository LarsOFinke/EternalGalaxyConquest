"use strict";
import { sendPlayerActions } from "../../egc.js";



export class BuildingMenu {
    constructor(base_id, settlement, building) {
        this.base_id = base_id;
        this.settlement = settlement;
        this.building = building;
        this.spawnBuildingMenu();
    }


    assignWorker(event, population_id) {
        event.preventDefault();
        const payload = {
            "category": "buildings",
            "location": ["factory", this.settlement.settlement_id, this.base_id],
            "target": "Builders Hut",
            "action": "Convert Worker To Builder",
            "context": [population_id,]
        };
        sendPlayerActions(payload);
    }

    spawnBuildersHutMenu() {
        const builders_hut_menu = document.createElement("div");
        builders_hut_menu.id = "settlement-menu-container";
        builders_hut_menu.className = "bordered";

        this.settlement.getFreeWorkers().forEach(fworker => {
            const assign_worker_input_box = document.createElement("div");
            assign_worker_input_box.className = "small-input-box";
            const assign_worker_lbl = document.createElement("label");
            assign_worker_lbl.id = "build-builders-hut-lbl";
            assign_worker_lbl.textContent = fworker.name;
            assign_worker_input_box.insertAdjacentElement("afterbegin", assign_worker_lbl);
            const assign_worker_btn = document.createElement("button");
            assign_worker_btn.id = "assign-worker-hut-btn";
            assign_worker_btn.className = "btn-small";
            assign_worker_btn.textContent = "Zuweisen";
            assign_worker_btn.addEventListener("click", event => this.assignWorker(event, fworker.population_id));
            assign_worker_input_box.insertAdjacentElement("beforeend", assign_worker_btn);
            builders_hut_menu.insertAdjacentElement("beforeend", assign_worker_input_box);
        })
        

        return builders_hut_menu;
    }

    spawnBuildingMenu() {
        const building_menu_container = document.createElement("div");
        building_menu_container.id = "building-menu-container";
        building_menu_container.className = "bordered";
        const building_menu_header = document.createElement("h4");
        building_menu_header.textContent = this.building.name;
        building_menu_container.insertAdjacentElement("afterbegin", building_menu_header);

        const close_btn = document.createElement("button");
        close_btn.classList = "close-btn bordered";
        close_btn.textContent = "X";
        close_btn.addEventListener("click", this.closeBuildingMenu.bind(this)); // Add bound method
        building_menu_container.insertAdjacentElement("afterbegin", close_btn);

        switch (this.building.name){
            case "Builders Hut":
                const builders_hut_menu = this.spawnBuildersHutMenu();
                building_menu_container.insertAdjacentElement("beforeend", builders_hut_menu);
        }
        
        document.getElementById("next-round").insertAdjacentElement("afterend", building_menu_container);
    }

    closeBuildingMenu() {
        const building_menu_container = document.getElementById("building-menu-container");
        if (building_menu_container) {
            building_menu_container.remove();
        }
    }


}
