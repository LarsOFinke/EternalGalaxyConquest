### IMPORT PERSONS ###
from Commander import Commander; from Worker import Worker; from Builder import Builder; from WarehouseWorker import WarehouseWorker; from Baker import Baker
from Woodcutter import Woodcutter; from Miner import Miner; from Blacksmith import Blacksmith

### IMPORT BUILDINGS ###
from ResidentialArea import ResidentialArea; from BuildersHut import BuildersHut; from Storage import Storage; from Bakery import Bakery 
from Sawmill import Sawmill; from GoldMine import GoldMine; from IronMine import IronMine; from Forge import Forge


class City():
    building_list: list = [
    {
        "name": "Headquarter",
        "costs": {
            "gold": 0,
            "food": 0,
            "wood": 0,
            "iron": 0
        }
    },
    {
        "name": "Builders hut",
        "costs": {
            "gold": 200,
            "food": 150,
            "wood": 200,
            "iron": 50
        }
    },
    {
        "name": "Storage",
        "costs": {
            "gold": 200,
            "food": 200,
            "wood": 400,
            "iron": 100
        }
    },
    {
        "name": "Bakery",
        "costs": {
            "gold": 300,
            "food": 200,
            "wood": 300,
            "iron": 50
        }
    },
    {
        "name": "Sawmill",
        "costs": {
            "gold": 300,
            "food": 150,
            "wood": 200,
            "iron": 50
        }
    },
    {
        "name": "Gold mine",
        "costs": {
            "gold": 200,
            "food": 100,
            "wood": 200,
            "iron": 50
        }
    },
    {
        "name": "Iron mine",
        "costs": {
            "gold": 200,
            "food": 100,
            "wood": 200,
            "iron": 50
        }
    },
    {
        "name": "Forge",
        "costs": {
            "gold": 300,
            "food": 200,
            "wood": 150,
            "iron": 200
        }
    }
]
    build_options: dict = {
            "Builders hut": BuildersHut,
            "Storage": Storage,
            "Bakery": Bakery,
            "Sawmill": Sawmill,
            "Gold mine": GoldMine,
            "Iron mine": IronMine,
            "Forge": Forge,
        }

    
    def __init__(self, name: str, 
                 gold: float, food: float, wood: float, iron: float, 
                 buildings: list = [], 
                 population: list = []
                 ) -> None:
        self.name: str = name
        self.__gold: float = gold
        self.__food: float = food
        self.__wood: float = wood
        self.__iron: float = iron
        self.__buildings: list = buildings
        self.__population: list = population
        self.__free_workers: list = [person for person in self.__population if person.category == "worker" and person.employed == False]
        self.__free_builders: list = [person for person in self.__population if person.category == "builder" and person.working == False]
        
        
    def get_resources(self) -> dict:
        return {
            "gold": self.__gold,
            "food": self.__food,
            "wood": self.__wood,
            "iron": self.__iron
        }
    
    
    def get_buildings(self) -> list:
        return self.__buildings
    
    def __set_buildings(self, building, increase: bool = True):
        if increase:
            self.__buildings.append(building)
        else:
            self.__buildings.remove(building)
    
    
    def get_population(self) -> list:
        return self.__population
    
    def __set_population(self, person, increase: bool = True) -> None:
        if increase:
            self.__population.append(person)
        else:
            self.__population.remove(person)
    
    def add_population(self, person):
        self.__set_population(person)
    
    def remove_population(self, person):
        self.__set_population(person, increase=False)
    
    
    def get_free_workers(self) -> list:
        return self.__free_workers
    
    def __set_free_workers(self, worker: Worker, increase: bool = True) -> None:
        if increase:
            self.__free_workers.append(worker)
        else:
            self.__free_workers.remove(worker)
    
    def add_free_worker(self, worker: Worker):
        self.__set_free_workers(worker)
    
    def remove_free_worker(self, worker: Worker):
        self.__set_free_workers(worker, increase=False)
    
    
    def get_free_builders(self) -> list:
        return self.__free_builders
    
    def __set_free_builders(self, builder: Builder, increase: bool = True) -> None:
        if increase:
            self.__free_builders.append(builder)
        else:
            self.__free_builders.remove(builder)
    
    def add_free_builder(self, builder: Builder) -> None:
        self.__set_free_builders(builder)
        
    def remove_free_builder(self, builder: Builder) -> None:
        self.__set_free_builders(builder, increase=False)
      
        
    def build(self, building_name: str) -> dict:
        """ 
            result = hs.build()
            if result["success"]:
                print("Wird gebaut")
            else:
                print(result["message"])
        """
        has_builders_hut: bool = True if building_name == "Builders hut" else False
        for building in self.__buildings:
            if building.category == "Builders hut":
                has_builders_hut: bool = True
        if not has_builders_hut:
            return {"success": False, "message": "Zuerst eine Bauhütte bauen!"}
        
        else:
            building_costs: dict = self.fetch_building_costs(building_name)
            result: dict = self.check_if_enough_resources(building_costs)
            if not result["success"]:
                return {"success": False, "message": f"Nicht genug '{result["message"]}'!"}

            if self.build_building(building_name):
                self.subtract_costs(building_costs)
                return {"success": True}
            
            return {"success": False, "message": f"'{building_name}' konnt nicht gebaut werden!"}

    def build_building(self, building_name: str, *parameters) -> bool:        
        for option, Building in City.build_options.items():
            if option == building_name:
                self.__set_buildings(Building((parameters)))
                return True
        
        return False
    
    def remove_building(self, building):
        self.__set_buildings(building, increase=False)
        del building
    
            
    def fetch_building_costs(self, building_name: str) -> dict:
        for building in City.building_list:
                if building["name"] == building_name:
                    building_costs: dict = building["costs"]
                    
        return building_costs
        
    def check_if_enough_resources(self, costs: dict) -> dict:
        """Checks whether the City has the resources required for the action or not.

        Args:
            costs (dict): {
            "gold": gold,
            "food": food,
            "wood": wood,
            "iron": iron
            }

        Returns:
            bool: True if enough resources, false if not.
        """
        planet_resources: dict = {
            "gold": self.__gold,
            "food": self.__food,
            "wood": self.__wood,
            "iron": self.__iron
        }
        
        for resource, stock in planet_resources.items():
            if stock - costs[resource] < 0:
                return {"success": False, "message": f"Nicht genug {resource}"}
            
        return {"success": True}
    
    def subtract_costs(self, costs: dict) -> None:
        self.__gold -= costs["gold"]
        self.__food -= costs["food"]
        self.__wood -= costs["wood"]
        self.__iron -= costs["iron"]
    
    
    def create_worker(self, name: str) -> dict:
        worker_costs: dict = {
            "gold": 100,
            "food": 200,
            "wood": 50,
            "iron": 0
        }
        
        if not self.check_if_enough_resources(worker_costs):
            return {"success": False, "message": "Nicht genug Resourcen für einen neuen Arbeiter!"}
        
        self.subtract_costs(worker_costs)
        
        new_worker = Worker(name)
        self.__set_population(new_worker)
        self.__set_free_workers(new_worker)
        
        return {"success": True}








if __name__ == "__main__":
    ct = City("TestCT", 2000, 2000, 2000, 2000, buildings=[BuildersHut()])
    # print(ct.build_building("Builders hut"))
    # print(ct.build("Builders hut"))
    # print(ct.get_buildings()[1].worker_slots)
    
    # building = ct.get_buildings()[0]
    # print(building)
    # ct.remove_building(building)
    # print(ct.get_buildings())
    

    pass
