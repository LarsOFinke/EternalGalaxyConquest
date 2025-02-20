from .City import City
from ..buildings.Headquarter import Headquarter
from ..persons.Commander import Commander
from ..persons.Worker import Worker


class MainCity(City):
    def __init__(self, name: str, 
                 gold = 2000, food = 1000, wood = 1500, iron = 500, 
                 buildings = [Headquarter()],
                 population = [Commander("Gottfried"), Worker("Abrams")] 
                 ) -> None:
        super().__init__(name=name, gold=gold, food=food, wood=wood, iron=iron, buildings=buildings, population=population)
     
    
    


if __name__ == "__main__":
    mc = MainCity("TestMCs")
    
    # print(mc.get_buildings())
    # print(City.building_list)
    
    # print(mc.get_resources())
    # print(mc.build("Gold mine"))
    # print(mc.get_resources())
    
    # print(mc.create_worker("Abrams"))
    # print(mc.get_population())
    # print(mc.get_free_workers()[0].name)
    
    # print(mc.build("Builders hut"))
    # print(mc.get_buildings())
    # bh = mc.get_buildings()[1]
    # w = mc.get_free_workers()[0]
    # bh.convert_worker_to_builder(w, mc)
    # print(mc.get_free_builders()[0].name) 
    # print(mc.get_free_workers())
    # print(mc.get_population())
    
    pass
    
