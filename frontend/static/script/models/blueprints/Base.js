"use strict";
import { Outpost } from "../locations/Outpost.js";
import { City } from "../locations/City.js";
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
                settlement_list.push(new MainCity(settlement.settlement_id, settlement.settlement_type, settlement.name, settlement.resources, 
                    settlement.building_states, settlement.population_states, 
                    settlement.free_workers, settlement.free_builders)
                );
            }
        }

        return settlement_list;
    }

    createSettlementInstance(settlement) {
        if (settlement.action === "Found Outpost") {
            return new Outpost(settlement.settlement_id, "outpost", settlement.name, settlement.resources, 
                settlement.buildings, settlement.population, settlement.free_workers, settlement.free_builders);
        } else if (settlement.action === "Found City") {
            return new City(settlement.settlement_id, "city", settlement.name, settlement.resources, 
                settlement.buildings, settlement.population, settlement.free_workers, settlement.free_builders);
        }
    }

    setSettlement(settlement, increase=true) {
        if (increase) {
            this.__settlements.push(settlement);
        } else {
            const pop_index = this.__settlements.findIndex(settlement => settlement.settlement_id === parseInt(settlement));
            this.__settlements.splice(pop_index, 1);
        }
    }
}
