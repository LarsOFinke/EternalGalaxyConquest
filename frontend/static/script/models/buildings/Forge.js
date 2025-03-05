"use strict";
import { Factory } from "..blueprints/Factory.js";



export class Forge extends Factory {
    constructor(building_id, name, active, worker_slots, workers) {
        super(building_id, name, active, worker_slots, workers);
        
    }
}
