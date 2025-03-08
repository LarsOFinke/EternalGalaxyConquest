"use strict";



export class PopulationMenu {
    constructor() {
        this.spawnPopulationMenu();
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



        document.getElementById("next-round").insertAdjacentElement("afterend", population_menu_container);
    }

    closePopulationMenu() {
        const population_menu_container = document.getElementById("population-menu-container");
        if (population_menu_container) {
            population_menu_container.remove();
        }
    }
}
