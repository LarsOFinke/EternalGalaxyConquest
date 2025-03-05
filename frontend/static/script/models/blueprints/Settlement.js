"use strict";
import { Worker } from "../population/Worker.js";



export class Settlement {
    constructor(name, resources, buildings, population, free_workers, free_builders) {
        this.name = name;
        this.resources = resources;
        this.buildings = buildings;
        this.population = this.addPopulation(population);
        this.free_workers = free_workers;
        this.free_builders = free_builders;
        
    }

    addPopulation(population) {
            let population_list = []
            for (let pops of population) {
                if (pops.profession === "worker") {
                    population_list.push(new Worker(pops.pop_id, pops.name, pops.profession, pops.alive, pops.employed, pops.field_of_work, pops.working, pops.production));
                }
            }
    
            return population_list;
        }
}
