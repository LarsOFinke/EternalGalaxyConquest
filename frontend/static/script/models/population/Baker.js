"use strict";
import { Worker } from "./Worker.js";



export class Baker extends Worker {
    constructor(population_id, name, profession, alive, employed, field_of_work, working, production) {
        super(population_id, name, profession, alive, employed, field_of_work, working, production);
        
    }
}
