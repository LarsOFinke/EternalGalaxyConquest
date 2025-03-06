"use strict";
import { MainCity } from "../locations/MainCity.js";



export class Base {
    constructor(tile_id, base_id, name, settlements) {
        this.tile_id = tile_id;
        this.base_id = base_id;
        this.name = name;
        this.__settlements = this.addInitialSettlements(settlements);

    }

    getSettlements() {
        return this.__settlements;
    }


    addInitialSettlements(settlements) {
        let settlement_list = []
        for (let settlement of settlements) {
            if (settlement.settlement_type === "main_city") {
                settlement_list.push(new MainCity(settlement.settlement_id, settlement.name, settlement.resources, 
                    settlement.building_states, settlement.population_states, 
                    settlement.free_workers, settlement.free_builders)
                );
            }
        }

        return settlement_list;
    }
}
