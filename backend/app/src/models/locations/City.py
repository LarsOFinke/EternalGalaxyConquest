### IMPORT PERSONS ###
from ..persons.Commander import Commander; from ..persons.Worker import Worker; from ..persons.Builder import Builder; from ..persons.WarehouseWorker import WarehouseWorker; from ..persons.Baker import Baker
from ..persons.Woodcutter import Woodcutter; from ..persons.Miner import Miner; from ..persons.Blacksmith import Blacksmith

### IMPORT BUILDINGS ###
from ..buildings.ResidentialArea import ResidentialArea; from ..buildings.BuildersHut import BuildersHut; from ..buildings.Warehouse import Warehouse; from ..buildings.Bakery import Bakery 
from ..buildings.Sawmill import Sawmill; from ..buildings.GoldMine import GoldMine; from ..buildings.IronMine import IronMine; from ..buildings.Forge import Forge


class City():
    def __init__(self, name: str, 
                 gold: float, food: float, wood: float, iron: float, 
                 buildings: list = [], 
                 population: list = []
                 ) -> None:
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
                "name": "Builders hut",
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
        self.action_list: list[dict] =  [
                                            { "name": "Select Building", "action": self.select_building },
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
        self.name: str = name
        self.__gold: float = gold
        self.__food: float = food
        self.__wood: float = wood
        self.__iron: float = iron
        self.__buildings: list = buildings
        self.__population: list = population
        self.__free_workers: list = [person for person in self.__population if person.category == "Worker" and person.employed == False]
        self.__free_builders: list = [person for person in self.__population if person.category == "Worker" and person.field_of_work == "Builder" and person.working == False]
    
    
    def match_payload_action(self, action: str, context: list) -> dict:
        try:
            for act in self.action_list:
                if act["name"] == action:
                    return act["action"](*context)
        except Exception as e:
            return { "success": False, "message": e }
    
    
    def select_building(self, target) -> dict:
        for building in self.__buildings:
            if building.category == target:
                return  { "success": True, "target": building }
        
        return { "success": False, "message": f"{target} nicht gefunden!" }
    
        
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
    
    
    def get_free_workers(self) -> dict:
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
    
    
    def get_free_builders(self, dump) -> dict:
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
      
        
    def build(self, building_name: str) -> dict:
        """ 
            result = hs.build()
            if result["success"]:
                print("Wird gebaut")
            else:
                print(result["message"])
        """
        has_builders_hut: bool = True if building_name == "Builders hut" else self.check_if_has_builders_hut()
        if not has_builders_hut:
            return  { "success": False, "message": "Zuerst eine Bauhütte bauen!" }
        
        builder_available: bool = self.check_if_builder_available()
        if not builder_available:
            return  { "success": False, "message": "Kein verfügbarer Baumeister!" }

        building_costs: dict = self.fetch_building_costs(building_name)
        result: dict = self.check_if_enough_resources(building_costs)
        if not result["success"]:
            return result

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
        for building in self.building_list:
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








if __name__ == "__main__":
    ct = City("TestCT", 2000, 2000, 2000, 2000, buildings=[BuildersHut()])
    # print(ct.build_building("Builders Hut"))
    # print(ct.build("Builders hut"))
    # print(ct.get_buildings()[1].worker_slots)
    
    # building = ct.get_buildings()[0]
    # print(building)
    # ct.remove_building(building)
    # print(ct.get_buildings())
    

    pass
