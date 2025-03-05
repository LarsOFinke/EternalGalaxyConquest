"use strict";
import { Settlement } from "../blueprints/Settlement.js";



export class City extends Settlement{
    constructor(settlement_id, name, resources, buildings, population, free_workers, free_builders) {
        super(settlement_id, name, resources, buildings, population, free_workers, free_builders);

    }
}
