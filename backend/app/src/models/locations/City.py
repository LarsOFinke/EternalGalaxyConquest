"use strict";
from ..blueprints.Settlement import Settlement


class City(Settlement):
    def __init__(self, name, gold, food, wood, iron, buildings = ..., population = ..., settlement_type="city"):
        super().__init__(name=name, gold=gold, food=food, wood=wood, iron=iron, buildings=buildings, population=population, settlement_type=settlement_type)
