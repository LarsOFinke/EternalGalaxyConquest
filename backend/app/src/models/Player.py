from .locations.HomePlanet import HomePlanet
from .locations.Planet import Planet



class Player():
    def __init__(self, name: str, player_id: int, bases: list = [HomePlanet("Heimatplanet")]):
        self.__action_list: list[dict] =  [
                                            { "name": "Select Base", "action": self.select_base, }
                                        ]
        self.name: str = name
        self.player_id: int = player_id
        self.__bases: list = bases


    def get_bases(self) -> list:
        return self.__bases
    
    def fetch_player_state(self) -> dict:
        player_state: dict = {
            "category": "player",
            "name": self.name,
            "player_id": self.player_id,
            "bases_state": [base.fetch_base_state() for base in self.__bases]
        }
        
        return player_state


    def match_payload_action(self, action: str, context: list) -> dict:
        try:
            for act in self.__action_list:
                if act["name"] == action:
                    return act["action"](*context)
        except Exception as e:
            return  { "success": False, "message": e }


    def select_base(self, target) -> dict:
        for base in self.__bases:
            if base.name == target:
                return  { "success": True, "target": base }
        
        return  { "success": False, "message": f"{target} nicht gefunden!" }
