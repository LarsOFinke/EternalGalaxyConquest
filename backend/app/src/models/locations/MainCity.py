from .City import City
from ..buildings.Headquarter import Headquarter
from ..population.Commander import Commander
from ..population.Worker import Worker
# from ..buildings.BuildersHut import BuildersHut
# from ..persons.Builder import Builder


class MainCity(City):
    def __init__(self, name: str, 
                 gold=2000, food=1000, wood=1500, iron=500, 
                 buildings=None,
                 population=None 
                 ) -> None:
        if buildings == None:
            buildings = [Headquarter()]
        if population == None:
            population = [Commander("Gottfried"), Worker("Abrams")]
        super().__init__(name=name, settlement_type="main_city", gold=gold, food=food, wood=wood, iron=iron, buildings=buildings, population=population)
     
    