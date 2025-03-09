"use strict";
import { sendPlayerActions } from "../../egc.js";



export class PopulationMenu {
    constructor(base_id, settlement) {
        this.base_id = base_id;
        this.settlement = settlement;
        this.spawnPopulationMenu();
    }

    createNewWorker(event) {
        event.preventDefault();
        const name = document.getElementById("create-new-worker").value;

        const payload = {
            "category": "locations",
            "location": ["settlements", this.base_id],
            "target": this.settlement.settlement_id,
            "action": "Create Worker",
            "context": [name,]
        };
        sendPlayerActions(payload);
    }

    createNewWorkerContainer() {
        const create_new_worker_container = document.createElement("div");
        create_new_worker_container.id = "create-new-worker-container";
        create_new_worker_container.classList = "very-bottom";

        const input_box = document.createElement("div");
        input_box.classList = "bottom small-input-box";

        const create_new_worker_input = document.createElement("input");
        create_new_worker_input.id = "create-new-worker"; 
        create_new_worker_input.type = "text";
        input_box.insertAdjacentElement("beforeend", create_new_worker_input);

        const create_new_worker_btn = document.createElement("button");
        create_new_worker_btn.classList = "btn-small";
        create_new_worker_btn.textContent = "Anheuern!";
        create_new_worker_btn.addEventListener("click", event => this.createNewWorker(event));
        input_box.insertAdjacentElement("beforeend", create_new_worker_btn);

        create_new_worker_container.insertAdjacentElement("beforeend", input_box);
 

        return create_new_worker_container;
    }

    spawnPopulationTable() {
        const population_container = document.createElement("div");
        population_container.id = "buildings-container";
        population_container.className = "centered";

        this.settlement.getPopulation().forEach(population => {
            const population_input_box = document.createElement("div");
            population_input_box.className = "small-input-box";

            const population_lbl = document.createElement("label");
            population_lbl.textContent = population.name;
            population_input_box.insertAdjacentElement("beforeend", population_lbl);

            const population_btn = document.createElement("button");
            population_btn.className = "btn-small";
            population_btn.textContent = "Ansehen";
            // population_btn.addEventListener("click", e => new BuildingMenu(this.base_id, this.settlement, building));
            population_input_box.insertAdjacentElement("beforeend", population_btn),
            population_container.insertAdjacentElement("beforeend", population_input_box);
        })
        
        return population_container;
    }

    spawnPopulationMenu() {
        const population_menu_container = document.createElement("div");
        population_menu_container.id = "population-menu-container";
        population_menu_container.className = "bordered";
        const population_menu_header = document.createElement("h4");
        population_menu_header.textContent = "Bevölkerungsmenü";
        population_menu_container.insertAdjacentElement("afterbegin", population_menu_header);

        const close_btn = document.createElement("button");
        close_btn.classList = "close-btn bordered";
        close_btn.textContent = "X";
        close_btn.addEventListener("click", this.closePopulationMenu.bind(this)); // Add bound method
        population_menu_container.insertAdjacentElement("afterbegin", close_btn);

        const population_table = this.spawnPopulationTable();
        population_menu_container.insertAdjacentElement("beforeend", population_table);

        const create_new_worker_container = this.createNewWorkerContainer();
        population_menu_container.insertAdjacentElement("beforeend", create_new_worker_container);


        document.getElementById("next-round").insertAdjacentElement("afterend", population_menu_container);
    }

    closePopulationMenu() {
        const population_menu_container = document.getElementById("population-menu-container");
        if (population_menu_container) {
            population_menu_container.remove();
        }
    }
}
