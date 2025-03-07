"use strict";
import { Worker } from "../population/Worker.js";
import { BuildersHut } from "../buildings/BuildersHut.js";
import { Headquarter } from "../buildings/Headquarter.js";



export class Settlement {
    constructor(settlement_id, name, resources, buildings, population, free_workers, free_builders) {
        this.settlement_id = settlement_id;
        this.name = name;
        this.__resources = resources;
        this.__buildings = this.addInitialBuildings(buildings);
        this.__population = this.addInitialPopulation(population);
        this.__free_workers = free_workers;
        this.__free_builders = free_builders;
        
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

    addInitialPopulation(population) {
        let population_list = []
        for (let pops of population) {
            if (pops.profession === "worker") {
                population_list.push(new Worker(pops.population_id, pops.name, pops.profession, pops.alive, pops.employed, pops.field_of_work, pops.working, pops.production));
            }
        }

        return population_list;
    }

    setPopulation(new_building) {
        this.__buildings.push(new_building);
    }



    addNewBuilding(building) {
        switch (building.name) {
            case "Builders Hut":
                this.setBuildings(new BuildersHut(building.building_id, building.name, building.active, building.worker_slots, building.workers));

        }
    }


    addNewPopulation(person) {

    }

}
