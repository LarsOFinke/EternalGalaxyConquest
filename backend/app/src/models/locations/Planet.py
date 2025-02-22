from .Outpost import Outpost
from .City import City



class Planet():
    def __init__(self, name: str, settlements: list = []):
        self.action_list: list[dict] = [
                                            {
                                                "name": "Select Settlement",
                                                "action": self.select_settlement
                                            },
                                            {
                                                "name": "Build City",
                                                "action": self.build_city
                                            },
                                            {
                                                "name": "Build Outpost",
                                                "action": self.build_outpost
                                            }
                                        ]
        self.name: str = name
        self.settlements: list = settlements
        
    
    def match_payload_action(self, action: str, context: list) -> dict:
        for act in self.action_list:
            if act["name"] == action:
                return act["action"](*context)
    
    
    def select_settlement(self, target) -> dict:
        for settlement in self.settlements:
            if settlement.name == target:
                return  {
                            "success": True, 
                            "target": settlement
                        }
        
        return  {
                    "success": False, 
                    "message": f"{target} not found!"
                }
    
    
    def build_outpost(self) -> dict:
        try:
            new_outpost = Outpost()
            self.settlements.append(new_outpost)
            return  {
                        "success": True, 
                        "message": f"New outpost successfully founded on {self.name}!"
                    }
        
        except Exception as e:
            return  { 
                        "success": False, 
                        "message": f"New outpost could NOT be founded on {self.name}!\n{e}"
                    }


    def build_city(self, name: str, 
                   gold: float, food: float, wood: float, iron: float, 
                   buildings: list = [], 
                   population: list = []
                   ) -> dict:
        try:
            new_city = City(name, gold, food, wood, iron, buildings, population)
            self.settlements.append(new_city)
            return  {
                        "success": True, 
                        "message": f"New city successfully founded on {self.name}!"
                    }
        
        except Exception as e:
            return  { 
                        "success": False, 
                        "message": f"New outpost could NOT be founded on {self.name}!\n{e}"
                    }
