from .locations.HomePlanet import HomePlanet
from .locations.Planet import Planet



class Player():
    def __init__(self, name: str, player_id: int, bases: list = [HomePlanet("Heimatplanet")]):
        self.action_list: list[dict] = [
                                            {
                                                "name": "",
                                                "action": 0,
                                            }
                                        ]
        self.name: str = name
        self.player_id: int = player_id
        self.bases: list = bases



    def process_base_action(self, payload):
        target = self.select_base(payload)
        target.match_payload_action(payload)


    def select_base(self, payload):
        for base in self.bases:
            if base.name == payload["target_name"]:
                return base
