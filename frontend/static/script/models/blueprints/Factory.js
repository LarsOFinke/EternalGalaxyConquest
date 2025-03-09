"use strict";



export class Factory {
    constructor(building_id, name, active, worker_slots, workers) {
        super(building_id, name, active);
        this.worker_slots = worker_slots;
        this.workers = workers;
    }
}
