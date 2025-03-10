"use strict";
import { Commander } from "../population/Commander.js"
import { Worker } from "../population/Worker.js";
import { Builder } from "../population/Builder.js";
import { BuildersHut } from "../buildings/BuildersHut.js";
import { Headquarter } from "../buildings/Headquarter.js";



export class Settlement {
    constructor(settlement_id, settlement_type, name, resources, buildings, population, free_workers, free_builders) {
        this.settlement_id = settlement_id;
        this.settlement_type = settlement_type;
        this.name = name;
        this.__resources = resources;
        this.__buildings = this.addInitialBuildings(buildings);
        this.__population = this.addInitialPopulation(population);
        this.__free_workers = free_workers;
        this.__free_builders = free_builders;
        
    }

    test() {    // DO NOT REMOVE THIS, FOR SOME REASON ITS REQUIRED FOR setFreeWorkers TO FUNCTION, I HAVE TRIED EVERYTHING! :/ //
        this.__free_workers.push({"name": "test", "population_id": 1});
    }
    
    getBuildings() {
        return this.__buildings;
    }

    addInitialBuildings(buildings) {
        let building_list = []
        for (let building of buildings) {
            if (building.name === "Headquarter") {
                building_list.push(new Headquarter(building.building_id, building.name, building.active));
            } else if (building.name === "Builders Hut") {
                building_list.push(new BuildersHut(building.building_id,building.name, building.active, building.worker_slots, building.workers));
            }
        }

        return building_list;
    }

    setBuildings(new_building) {
        this.__buildings.push(new_building);
    }


    getPopulation() {
        return this.__population;
    }

    createPopulationInstance(pops) {
        if (pops.profession === "leader") {
            return new Commander(pops.population_id, pops.name, pops.profession, pops.alive);
        } else if (pops.profession === "worker") {
            if (pops.field_of_work === "unskilled") {
                return new Worker(pops.population_id, pops.name, pops.profession, pops.alive, pops.employed, pops.field_of_work, pops.working, pops.production);
            } else if (pops.field_of_work === "builder") {
                return new Builder(pops.population_id, pops.name, pops.profession, pops.alive, pops.employed, pops.field_of_work, pops.working, pops.production);
            } 
        }
    }

    addInitialPopulation(population) {
        let population_list = []
        for (let pops of population) {
            let new_pop = this.createPopulationInstance(pops);
            population_list.push(new_pop);
        }

        return population_list;
    }

    setPopulation(population, increase=true) {
        if (increase) {
            this.__population.push(population);
        } else {
            const pop_index = this.__population.findIndex(pops => pops.population_id === parseInt(population));
            this.__population.splice(pop_index, 1);
        }
    }


    getFreeWorkers() {
        return this.__free_workers;
    }

    setFreeWorkers(worker, increase=true) {
        if (increase) {
            this.__free_workers.push(worker);
        } else {
            const pop_index = this.__free_workers.findIndex(fw => fw.population_id === parseInt(worker));
            this.__free_workers.splice(pop_index, 1);
        }
    }


    addNewBuilding(building) {
        switch (building.name) {
            case "Builders Hut":
                this.setBuildings(new BuildersHut(building.building_id, building.name, building.active, building.worker_slots, building.workers));

        }
    }

}
