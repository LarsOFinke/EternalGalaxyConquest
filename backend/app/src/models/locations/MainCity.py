from .City import City
from ..buildings.Headquarter import Headquarter
from ..persons.Commander import Commander
from ..persons.Worker import Worker
# from ..buildings.BuildersHut import BuildersHut
# from ..persons.Builder import Builder


class MainCity(City):
    def __init__(self, name: str, 
                 gold = 2000, food = 1000, wood = 1500, iron = 500, 
                 buildings = [Headquarter()],
                 population = [Commander("Gottfried"), Worker("Abrams")] 
                 ) -> None:
        super().__init__(name=name, gold=gold, food=food, wood=wood, iron=iron, buildings=buildings, population=population)
     
    