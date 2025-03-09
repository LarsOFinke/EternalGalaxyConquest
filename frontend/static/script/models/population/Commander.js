"use strict";
import { Human } from "../blueprints/Human.js";



export class Commander extends Human {
    constructor(population_id, name, profession, alive) {
        super(population_id, name, profession, alive);

    }
}
