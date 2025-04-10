from .locations.HomePlanet import HomePlanet
from .locations.Planet import Planet



class Player():
    def __init__(self, name: str, player_id: int, bases: list = None):
        if bases is None:
            bases = [HomePlanet("Heimatplanet")]
        self.__action_list: list[dict] =  [
                                            { "name": "Select Base", "action": self.select_base, }
                                        ]
        self.name: str = name
        self.player_id: int = player_id
        self.__bases: list = bases

    def get_bases(self) -> list:
        return self.__bases
    
    def fetch_player_state(self) -> dict:
        return {
            "category": "player",
            "name": self.name,
            "player_id": str(self.player_id),
            "base_states": [base.fetch_base_state() for base in self.__bases]
        }



    def match_payload_action(self, action: str, context: list) -> dict:
        try:
            for act in self.__action_list:
                if act.get("name") == action:
                    return act["action"](*context)
                
        except Exception as e:
            return  { "success": False, "message": f"{e}" }


    def select_base(self, target) -> dict:
        for base in self.__bases:
            if base.get_base_id() == int(target):
                return  { "success": True, "target": base }
        
        return  { "success": False, "message": f"{target} nicht gefunden!", "target": f"{target} nicht gefunden!" }
