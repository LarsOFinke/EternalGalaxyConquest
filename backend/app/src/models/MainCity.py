from City import City
from Headquarter import Headquarter
from Commander import Commander
from Worker import Worker


class MainCity(City):
    def __init__(self, name: str, 
                 gold = 2000, food = 1000, wood = 1500, iron = 500, 
                 buildings = [Headquarter()],
                 population = [Commander("Gottfried", Worker("Abrams"))] 
                 ) -> None:
        super().__init__(name=name, gold=gold, food=food, wood=wood, iron=iron, buildings=buildings, population=population)
     
    
    


if __name__ == "__main__":
    mc = MainCity("TestMCs", buildings=["Test", "Test2", "Builders hut"])
    
    # print(mc.get_buildings())
    # print(City.building_list)
    
    # print(mc.get_resources())
    # print(mc.build("Gold mine"))
    # print(mc.get_resources())
    
    # print(mc.create_worker())
    # print(mc.get_population())
    
    # print(mc.create_worker("Abrams"))
    # print(mc.get_free_workers()[0].name)
    
    # print(mc.get_free_builders()[0].name)       # --> FIND A WAY TO CONVERT A WORKER TO A BUILDER
    
    pass
    
