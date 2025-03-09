"use strict";
### IMPORT PERSONS ###
from ..population.Commander import Commander; from ..population.Worker import Worker; from ..population.Builder import Builder; from ..population.WarehouseWorker import WarehouseWorker; from ..population.Baker import Baker
from ..population.Woodcutter import Woodcutter; from ..population.Miner import Miner; from ..population.Blacksmith import Blacksmith

### IMPORT BUILDINGS ###
from ..buildings.ResidentialArea import ResidentialArea; from ..buildings.BuildersHut import BuildersHut; from ..buildings.Warehouse import Warehouse; from ..buildings.Bakery import Bakery 
from ..buildings.Sawmill import Sawmill; from ..buildings.GoldMine import GoldMine; from ..buildings.IronMine import IronMine; from ..buildings.Forge import Forge



class Settlement():
    settlement_count: int = 0
    
    def __init__(self, name: str, settlement_type,
                 gold: float, food: float, wood: float, iron: float, 
                 buildings: list = [], 
                 population: list = []
                 ) -> None:
        Settlement.settlement_count += 1
        self.action_list: list[dict] =  [
                                            { "name": "Select Building", "action": self.select_building },
                                            { "name": "Select Population", "action": self.select_population },
                                            { "name": "Build", "action": self.build },
                                            { "name": "Create Worker", "action": self.create_worker },
                                            { "name": "Remove Building", "action": self.remove_building },
                                            { "name": "Get Resources", "action": self.get_resources },
                                            { "name": "Get Buildings", "action": self.get_buildings },
                                            { "name": "Get Population", "action": self.get_population },
                                            { "name": "Add_population", "action": self.add_population },
                                            { "name": "Remove_population", "action": self.remove_population },
                                            { "name": "Get Free Workers", "action": self.get_free_workers },
                                            { "name": "Add Free Worker", "action": self.add_free_worker },
                                            { "name": "Remove Free Worker", "action": self.remove_free_worker },
                                            { "name": "Get Free Builders", "action": self.get_free_builders },
                                            { "name": "Add Free Builders", "action": self.add_free_builders },
                                            { "name": "Remove Free Builders", "action": self.remove_free_builders }
                                        ]
        self.building_list: list = [
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
                "name": "Builders Hut",
                "costs": {
                    "gold": 200,
                    "food": 150,
                    "wood": 200,
                    "iron": 50
                }
            },
            {
                "name": "Warehouse",
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
        self.build_options: dict = {
                "Builders Hut": BuildersHut,
                "Residential Area": ResidentialArea,
                "Warehouse": Warehouse,
                "Bakery": Bakery,
                "Sawmill": Sawmill,
                "Gold Mine": GoldMine,
                "Iron Mine": IronMine,
                "Forge": Forge,
        }
        self.__settlement_id = Settlement.settlement_count
        self.settlement_type = settlement_type
        self.name: str = name
        self.__gold: float = gold
        self.__food: float = food
        self.__wood: float = wood
        self.__iron: float = iron
        self.__buildings: list = buildings
        self.__population: list = population
        self.__free_workers: list = [person for person in self.__population if person.profession == "worker" and person.working == False]
        self.__free_builders: list = [person for person in self.__population if person.profession == "worker" and person.field_of_work == "builder" and person.working == False]
 
    def fetch_settlement_state(self) -> dict:
        return {
            "category": "settlement",
            "settlement_id": self.__settlement_id,
            "settlement_type": self.settlement_type,
            "name": self.name,
            "resources": self.get_resources("dump")["resources"],
            "building_states": [building.fetch_building_state() for building in self.__buildings],
            "population_states": [population.fetch_population_state() for population in self.__population],
            "free_workers": [{"name": worker.name, "population_id": worker.get_population_id()} for worker in self.__free_workers],
            "free_builders": [{"name": builder.name, "population_id": builder.get_population_id()} for builder in self.__free_builders]
        }
    
    def get_settlement_id(self):
        return self.__settlement_id
    
    def get_resources(self, dump) -> dict:
        return  {
                    "success": True,
                    "resources": {
                                    "gold": self.__gold,
                                    "food": self.__food,
                                    "wood": self.__wood,
                                    "iron": self.__iron
                                }
                }
    

    def get_buildings(self, dump) -> dict:
        return  { "success": True, "buildings": self.__buildings }
    
    def __set_buildings(self, building, increase: bool = True) -> None:
        if increase:
            self.__buildings.append(building)
        else:
            self.__buildings.remove(building)
    
    
    def get_population(self, dump) -> dict:
        return { "success": True, "population": self.__population }
    
    def __set_population(self, person, increase: bool = True) -> None:
        if increase:
            self.__population.append(person)
        else:
            self.__population.remove(person)
    
    def add_population(self, person) -> dict:
        self.__set_population(person)
        return  { "success": True }
    
    def remove_population(self, person) -> dict:
        self.__set_population(person, increase=False)
        return  { "success": True }
    
    
    def get_free_workers(self, dump="dump") -> dict:
        return { "success": True, "free_workers": self.__free_workers }
    
    def __set_free_workers(self, worker: Worker, increase: bool = True) -> None:
        if increase:
            self.__free_workers.append(worker)
        else:
            self.__free_workers.remove(worker)
    
    def add_free_worker(self, worker: Worker) -> dict:
        self.__set_free_workers(worker)
        return  { "success": True }
    
    def remove_free_worker(self, worker: Worker) -> dict:
        self.__set_free_workers(worker, increase=False)
        return  { "success": True }
    
    
    def get_free_builders(self, dump="dump") -> dict:
        return  { "success": True, "free_builders": self.__free_builders }
    
    def __set_free_builders(self, builder: Builder, increase: bool = True) -> None:
        if increase:
            self.__free_builders.append(builder)
        else:
            self.__free_builders.remove(builder)
    
    def add_free_builders(self, builder: Builder) -> dict:
        self.__set_free_builders(builder)
        return  { "success": True }
        
    def remove_free_builders(self, builder: Builder) -> dict:
        self.__set_free_builders(builder, increase=False)
        return  { "success": True }
      


    def match_payload_action(self, action: str, context: list) -> dict:
        try:
            for act in self.action_list:
                if act["name"] == action:
                    return act["action"](*context)
        except Exception as e:
            return { "success": False, "message": e }
    
    
    def select_building(self, target: str) -> dict:
        for building in self.__buildings:
            if building.name == target:
                return  { "success": True, "target": building }
        
        return { "success": False, "message": f"{target} nicht gefunden!" }
    
    def select_population(self, target: int) -> dict:
        """

        Args:
            target (int): The population_id of the target.

        Returns:
            dict: Returns the person under the "target"-key, if found, and a "message"-key if not.
        """
        for population in self.__population:
            if population.get_population_id() == int(target):
                return  { "success": True, "target": population }
        
        return { "success": False, "message": f"{target} nicht gefunden!" }
    
        
    def build(self, building_name: str) -> dict:
        """ 
            result = hs.build()
            if result["success"]:
                print("Wird gebaut")
            else:
                print(result["message"])
        """
        if building_name != "Builders Hut":         
            has_builders_hut: bool = self.check_if_has_builders_hut()
            if not has_builders_hut:
                return  { "success": False, "message": "Zuerst eine Bauhütte bauen!" }

            if not self.check_if_builder_available():
                return  { "success": False, "message": "Kein verfügbarer Baumeister!" }
            
        result_1: dict = self.check_if_building_already_exists(building_name)
        if not result_1["success"]: # Don't mind this logic... :) - false if building exists, true if not
            return result_1

        building_costs: dict = self.fetch_building_costs(building_name)
        result_2: dict = self.check_if_enough_resources(building_costs)
        if not result_2["success"]:
            return result_2

        if self.build_building(building_name):
            self.subtract_costs(building_costs)
            return  { "success": True, "message": f"{building_name} erfolgreich gebaut!" }
        
        return  { "success": False, "message": f"'{building_name}' konnt nicht gebaut werden!" }

    def check_if_has_builders_hut(self) -> bool:
        has_builders_hut: bool = False
        for building in self.__buildings:
            if building.category == "Builders hut":
                has_builders_hut: bool = True
        
        return has_builders_hut
    
    def check_if_builder_available(self) -> bool:
        if len(self.__free_builders) > 0:
            return True
        
        return False

    def check_if_building_already_exists(self, building_name: str) -> dict:
        for building in self.__buildings:
            if building.name == building_name:
                return {"success": False, "message": f"{building_name} bereits vorhanden!"}
        
        return {"success": True}

    def build_building(self, building_name: str, *parameters) -> bool:        
        for option, Building in self.build_options.items():
            if option == building_name:
                self.__set_buildings(Building((parameters)))
                return True
        
        return False
    
    def remove_building(self, building) -> None:
        try:
            self.__set_buildings(building, increase=False)
            del building
            return  {
                        "success": True,
                        "message": f"{building} erfolgreich entfernt!"
                    }
        
        except Exception as e:
            return  {
                        "success": False,
                        "message": f"{building} konnte nicht entfernt werden!\n{e}"
                    }
    
            
    def fetch_building_costs(self, building_name: str) -> dict:
        building_costs: dict = {}
        for building in self.building_list:
                if building["name"] == building_name:
                    return building["costs"]
                    
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
            dict: {"success": True} if everything worked, else {"success": False, "message": ...}
        """
        planet_resources: dict = {
            "gold": self.__gold,
            "food": self.__food,
            "wood": self.__wood,
            "iron": self.__iron
        }
        
        for resource, stock in planet_resources.items():
            if stock - costs[resource] < 0:
                return  {
                            "success": False, 
                            "message": f"Nicht genug {resource}"
                        }
            
        return  {
                    "success": True
                }
    
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
        result: dict = self.check_if_enough_resources(worker_costs)
        if not result["success"]:
            return result
        
        self.subtract_costs(worker_costs)
        
        new_worker = Worker(name)
        self.__set_population(new_worker)
        self.__set_free_workers(new_worker)
        
        return  { "success": True, "message": "Neuer Arbeiter erfolgreich angeheuert!" }
