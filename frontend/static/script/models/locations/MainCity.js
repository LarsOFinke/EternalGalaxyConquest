"use strict";
import { City } from "./City.js";



export class MainCity extends City {
    constructor(settlement_id, name, resources, buildings, population, free_workers, free_builders) {
        super(settlement_id, name, resources, buildings, population, free_workers, free_builders);
    }
}
