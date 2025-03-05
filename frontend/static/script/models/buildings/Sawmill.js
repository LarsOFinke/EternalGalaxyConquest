"use strict";
import { Factory } from "..blueprints/Factory.js";



export class Sawmill extends Factory {
    constructor(building_id, name, active, worker_slots, workers) {
        super(building_id, name, active, worker_slots, workers);
        
    }
}
