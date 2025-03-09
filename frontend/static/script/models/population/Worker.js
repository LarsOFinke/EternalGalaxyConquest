"use strict";
import { Human } from "../blueprints/Human.js";



export class Worker extends Human {
    constructor(population_id, name, profession, alive, employed, field_of_work, working, production) {
        super(population_id, name, profession, alive);
        this.employed = employed;
        this.field_of_work = field_of_work;
        this.working = working;
        this.production = production;
    }
}
