from .locations.HomePlanet import HomePlanet
from .locations.Planet import Planet



class Player():
    def __init__(self, name: str, player_id: int, bases: list = [HomePlanet("Heimatplanet")]):
        self.action_list: list[dict] = [
                                            {
                                                "name": "Select Base",
                                                "action": self.select_base,
                                            }
                                        ]
        self.name: str = name
        self.player_id: int = player_id
        self.bases: list = bases


    def match_payload_action(self, action: str, context: list) -> dict:
        for act in self.action_list:
            if act["name"] == action:
                return act["action"](*context)


    def select_base(self, target) -> dict:
        for base in self.bases:
            if base.name == target:
                return  {
                            "success": True, 
                            "target": base
                        }
        
        return  {
                    "success": False, 
                    "message": f"{target} nicht gefunden!"
                }
