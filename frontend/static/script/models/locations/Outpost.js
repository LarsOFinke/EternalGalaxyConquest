"use strict";
import { Settlement } from "../blueprints/Settlement.js";



export class Outpost extends Settlement{
    constructor(settlement_id, settlement_type, name, resources, buildings, population, free_workers, free_builders) {
        super(settlement_id, settlement_type, name, resources, buildings, population, free_workers, free_builders);

    }
}