"use strict";
import { Settlement } from "../blueprints/Settlement.js";



export class City extends Settlement{
    constructor(name, resources, buildings, population, free_workers, free_builders) {
        super(name, resources, buildings, population, free_workers, free_builders);

    }
}
