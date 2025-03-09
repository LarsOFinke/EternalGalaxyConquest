"use strict";
import { Mine } from "../blueprints/Mine.js";



export class GoldMine extends Mine {
    constructor(building_id, name, active, worker_slots, workers) {
        super(building_id, name, active, worker_slots, workers);
        
    }
}
