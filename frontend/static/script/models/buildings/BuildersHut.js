"use strict";
import { Building } from "../blueprints/Building.js";



export class BuildersHut extends Building {
    constructor(building_id, name, active, worker_slots, workers) {
        super(building_id, name, active, worker_slots, workers);
        
    }
}
