"use strict";



export class PopulationMenu {
    constructor(settlement) {
        this.settlement = settlement;
        this.spawnPopulationMenu();
    }

    createNewWorker() {

    }

    createNewWorkerButton() {
        const create_new_worker_btn = document.createElement("button");
        create_new_worker_btn.classList = "btn-small bottom-left";
        create_new_worker_btn.textContent = "Neuen Arbeiter anheuern";
        create_new_worker_btn.addEventListener("click", e => this.createNewWorker());

        return create_new_worker_btn;
    }

    spawnPopulationTable() {
        const population_table = document.createElement("table");
        population_table.className = "centered";
        const population_table_head = document.createElement("thead")
        const population_table_head_profession = document.createElement("th");
        population_table_head_profession.textContent = "Beruf";
        population_table_head.insertAdjacentElement("beforeend", population_table_head_profession);
        const population_table_head_name = document.createElement("th");
        population_table_head_name.textContent = "Details";
        population_table_head.insertAdjacentElement("beforeend", population_table_head_name);
        population_table.insertAdjacentElement("afterbegin", population_table_head);

        // CREATE A NEW ROW IN THE TABLE FOR EACH POPULATION FETCHED //
        this.settlement.getPopulation().forEach(population => {
            const new_row = document.createElement("tr");
            const population_name = document.createElement("td");
            population_name.textContent = population.profession;
            new_row.insertAdjacentElement("beforeend", population_name);
            const population_details = document.createElement("td");
            population_details.textContent = population.name;
            new_row.insertAdjacentElement("beforeend", population_details);
            population_table.insertAdjacentElement("beforeend", new_row);
        })

        return population_table;
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

        const create_new_worker_btn = this.createNewWorkerButton();
        population_menu_container.insertAdjacentElement("beforeend", create_new_worker_btn);


        document.getElementById("next-round").insertAdjacentElement("afterend", population_menu_container);
    }

    closePopulationMenu() {
        const population_menu_container = document.getElementById("population-menu-container");
        if (population_menu_container) {
            population_menu_container.remove();
        }
    }
}
