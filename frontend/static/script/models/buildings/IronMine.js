"use strict";
import { Mine } from "../blueprints/Mine.js";



export class IronMine extends Mine {
    constructor(building_id, name, active, worker_slots, workers) {
        super(building_id, name, active, worker_slots, workers);
        
    }
}
