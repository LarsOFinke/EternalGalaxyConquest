from .locations.HomePlanet import HomePlanet



class Player():
    def __init__(self, name: str, player_id: int, bases: list = [HomePlanet("Heimatplanet")]):
        self.name: str = name
        self.player_id: int = player_id
        self.bases: list = bases


