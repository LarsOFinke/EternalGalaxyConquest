"use strict";
import { sendPlayerActions } from "../egc.js";



export class BuildMenu {
    constructor() {

    }


    buildBuildersHut(event) {
        event.preventDefault();
        const payload = {
            "category": "locations",
            "location": ["settlements", "admin's Planet"],
            "target": "Hauptstadt",
            "action": "Build",
            "context": ["Builders Hut"]
        };
        sendPlayerActions(payload);
    }

    spawnBuildMenu() {
        const build_menu_container = document.createElement("div");
        build_menu_container.id = "build-menu-container";
        build_menu_container.className = "bordered";
        const build_menu_header = document.createElement("h4");
        build_menu_header.textContent = "Baumenü";
        build_menu_container.insertAdjacentElement("afterbegin", build_menu_header);

        const close_btn = document.createElement("button");
        close_btn.classList = "close-btn bordered";
        close_btn.textContent = "X";
        close_btn.addEventListener("click", this.closeBuildMenu.bind(this)); // Add bound method
        build_menu_container.insertAdjacentElement("afterbegin", close_btn);

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

        document.getElementById("next-round").insertAdjacentElement("afterend", build_menu_container);
    }

    closeBuildMenu() {
        const build_menu_container = document.getElementById("build-menu-container");
        if (build_menu_container) {
            build_menu_container.remove();
        }
    }

}
