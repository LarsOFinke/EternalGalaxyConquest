"use strict";



export class Building {
    constructor(building_id, name, active) {
        this.__building_id = building_id;
        this.name = name;
        this.active = active;
    }

    getBuildingId() {
        return this.__building_id;
    }

}
