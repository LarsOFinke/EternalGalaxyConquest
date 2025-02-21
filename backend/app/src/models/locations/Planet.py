from .Outpost import Outpost
from .City import City



class Planet():
    def __init__(self, name: str, settlements: list = []):
        self.name: str = name
        self.settlements: list = settlements
        
    
    def create_outpost(self):
        new_outpost = Outpost()
        self.settlements.append(new_outpost)

    def build_city(self, name: str, gold: float, food: float, wood: float, iron: float, buildings: list = [], population: list = []):
        new_city = City(name, gold, food, wood, iron, buildings, population)
        self.settlements.append(new_city)
        
