"use strict";



export class SettlementMenu {
    constructor() {
        
    }


    // const build_menu_btn = this.spawnBuildMenuButton();
    // tile_menu_container.insertAdjacentElement("beforeend", build_menu_btn);
    spawnBuildMenuButton() {
        const build_menu_btn = document.createElement("button");
        build_menu_btn.id = "build-menu-btn";
        build_menu_btn.className = "btn-small";
        build_menu_btn.textContent = "Baumenü";
        build_menu_btn.addEventListener("click", event => this.spawnBuildMenu(event));

        return build_menu_btn;
    }


    spawnSettlementMenu() {
        const settlement_menu_container = document.createElement("div");
        settlement_menu_container.id = "build-menu-container";
        settlement_menu_container.className = "bordered";
        const build_menu_header = document.createElement("h4");
        build_menu_header.id = "build-menu-header";
        build_menu_header.textContent = "Baumenü";
        settlement_menu_container.insertAdjacentElement("afterbegin", build_menu_header);

        const close_btn = document.createElement("button");
        close_btn.classList = "close-btn bordered";
        close_btn.textContent = "X";
        close_btn.addEventListener("click", this.closeSettlementMenu.bind(this)); // Add bound method
        settlement_menu_container.insertAdjacentElement("afterbegin", close_btn);

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
        settlement_menu_container.insertAdjacentElement("beforeend", build_builders_hut_input_box);

        document.getElementById("next-round").insertAdjacentElement("afterend", settlement_menu_container);
    }
}
