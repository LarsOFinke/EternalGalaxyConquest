from ..locations.Outpost import Outpost
from ..locations.City import City



class Base():
    base_count: int = 0
    
    def __init__(self, name: str, base_type: str, tile_id: int, settlements: list):
        Base.base_count += 1
        self.action_list: list[dict] =  [
                                            { "name": "Select Settlement", "action": self.select_settlement },
                                            { "name": "Found City", "action": self.found_city },
                                            { "name": "Found Outpost", "action": self.found_outpost }
                                        ]
        self.__base_id: int = Base.base_count
        self.base_type = base_type
        self.name: str = name
        self.__tile_id: int = tile_id
        self.__settlements: list = settlements
    
    def get_base_id(self) -> int:
        return self.__base_id
    
    def set_tile_id(self, tile_id):
        self.__tile_id = tile_id
    
    def get_tile_id(self) -> int:
        return self.__tile_id
    
    def fetch_base_state(self) -> dict:
        return {
            "category": "base",
            "name": self.name,
            "tile_id": self.__tile_id,
            "base_id": self.get_base_id(),
            "base_type": self.base_type,
            "settlement_states": [settlement.fetch_settlement_state() for settlement in self.__settlements]
        }
  
    
    
    def match_payload_action(self, action: str, context: list) -> dict:
        try:
            for act in self.action_list:
                if act["name"] == action:
                    return act["action"](*context)
        except Exception as e:
            return  { "success": False, "message": f"{e}" }
    
    
    def select_settlement(self, target) -> dict:
        for settlement in self.__settlements:
            if settlement.name == target:
                return  { "success": True, "target": settlement }
        
        return  { "success": False, "message": f"{target} nicht gefunden!" }
    
    
    def found_outpost(self) -> dict:
        try:
            new_outpost = Outpost()
            self.__settlements.append(new_outpost)
            return  { "success": True, "message": f"Neuer Außenposten erfolgreich gegründet auf: {self.name}!" }
        
        except Exception as e:
            return  { "success": False, "message": f"Neuer Außenposten konnte nicht gegründet werden auf: {self.name}!\n{e}" }


    def found_city(self, name: str, 
                   gold: float, food: float, wood: float, iron: float, 
                   buildings: list = [], 
                   population: list = []
                   ) -> dict:
        try:
            new_city = City(name, gold, food, wood, iron, buildings, population)
            self.__settlements.append(new_city)
            return  { "success": True, "message": f"Neue Stadt erfolgreich gegründet auf: {self.name}!" }
        
        except Exception as e:
            return  { "success": False, "message": f"Neue Stadt konnte nicht gegründet werden auf: {self.name}!\n{e}" }


