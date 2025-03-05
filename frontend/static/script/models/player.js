"use strict";
import { HomePlanet } from "./locations/HomePlanet.js";



export class Player {

    constructor(name, player_id, bases) {
        this.name = name;
        this.id = player_id;
        this.__bases = this.addBases(bases);

    }

    addBases(bases) {
        let base_list = [];

        for (let base of bases) {
            if (base.base_type === "home_planet") {
                base_list.push(new HomePlanet(base.tile_id, base.base_id, base.name, base.settlement_states));
            }

        }

        return base_list;

    }


}
