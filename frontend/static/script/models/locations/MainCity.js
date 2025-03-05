"use strict";
import { City } from "./City.js";



export class MainCity extends City {
    constructor(name, resources, buildings, population, free_workers, free_builders) {
        super(name, resources, buildings, population, free_workers, free_builders);
    }
}
