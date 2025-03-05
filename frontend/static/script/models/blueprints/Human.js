"use strict";
import { Population } from "./Population.js"



export class Human extends Population {
    constructor(population_id, name, profession, alive) {
        super(population_id, name, profession, alive);
        
    }
}
