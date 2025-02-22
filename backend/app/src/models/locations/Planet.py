from .Outpost import Outpost
from .City import City



class Planet():
    def __init__(self, name: str, settlements: list = []):
        self.action_list: list[dict] = [
                                            {
                                                "name": "Build City",
                                                "action": self.build_city
                                            }
                                        ]
        self.name: str = name
        self.settlements: list = settlements
        
    
    def match_payload_action(self, payload):
        for action in self.action_list:
            if action["name"] == payload["action"]:
                action["action"](*payload["context"])
    
    
    def create_outpost(self):
        new_outpost = Outpost()
        self.settlements.append(new_outpost)

    def build_city(self, name: str, gold: float, food: float, wood: float, iron: float, buildings: list = [], population: list = []):
        new_city = City(name, gold, food, wood, iron, buildings, population)
        self.settlements.append(new_city)
        
