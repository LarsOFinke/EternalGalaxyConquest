### IMPORT PERSONS ###
from Commander import Commander; from Worker import Worker; from Builder import Builder; from WarehouseWorker import WarehouseWorker; from Baker import Baker
from Woodcutter import Woodcutter; from Miner import Miner; from Blacksmith import Blacksmith

### IMPORT BUILDINGS ###
from Headquarter import Headquarter; from ResidentialArea import ResidentialArea; from BuildersHut import BuildersHut; from Storage import Storage; from Bakery import Bakery 
from Sawmill import Sawmill; from GoldMine import GoldMine; from IronMine import IronMine; from Forge import Forge



## GEBÄUDELISTE ## --> später als Import für die Stadt-Klasse
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


class City():
    building_list: list = building_list
    build_options: dict = {
            "Headquarter": Headquarter,
            "Builders hut": BuildersHut,
            "Storage": Storage
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
        
        
    def get_resources(self):
        return f"Gold: {self.__gold} | Food: {self.__food} | Wood: {self.__wood} | Iron: {self.__iron}"
    
    
    def get_buildings(self):
        return self.__buildings
    
    def __set_buildings(self, building, increase: bool = True):
        if increase:
            self.__buildings.append(building)
        else:
            self.__buildings.remove(building)
    
    
    def get_population(self):
        return self.__population
    
    def __set_population(self, person, increase: bool = True):
        if increase:
            self.__population.append(person)
        else:
            self.__population.remove(person)
    
    
    def get_free_workers(self):
        return self.__free_workers
    
    def __set_free_workers(self, worker, increase: bool = True):
        if increase:
            self.__free_workers.append(worker)
        else:
            self.__free_workers.remove(worker)
    
    
    def get_free_builders(self):
        return self.__free_builders
    
        
    def build(self, building_name: str) -> dict:
        """ 
            result = hs.build()
            if result["success"]:
                print("Wird gebaut")
            else:
                print(result["message"])
        """
        if "Builders hut" not in self.__buildings:    # --> VERGLEICH ERSETZEN MIT DEM RICHTIGEN OBJEKT
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

    def build_building(self, building_name: str, *parameters):        
        for option, Building in City.build_options.items():
            if option == building_name:
                self.__set_buildings(Building((parameters)))
                return True
        
        return False
    
            
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
    ct = City("TestCT", 2000, 2000, 2000, 2000, buildings=["Builders hut"])
    # print(ct.build_building("Builders hut"))
    print(ct.build("Builders hut"))
    print(ct.get_buildings()[1].worker_slots)
    
    pass
