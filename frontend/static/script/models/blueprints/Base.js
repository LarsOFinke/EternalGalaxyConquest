"use strict";
import { MainCity } from "../locations/MainCity.js";



export class Base {
    constructor(tile_id, base_id, name, settlements) {
        this.tile_id = tile_id;
        this.base_id = base_id;
        this.name = name;
        this.settlements = this.addSettlements(settlements);

    }

    addSettlements(settlements) {
        let settlement_list = []
        for (let settlement of settlements) {
            if (settlement.settlement_type === "main_city") {
                settlement_list.push(new MainCity(settlement.name, settlement.resources, 
                    settlement.buildings, settlement.population, 
                    settlement.free_workers, settlement.free_builders)
                );
            }
        }

        return settlement_list;
    }
}
