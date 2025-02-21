from .Outpost import Outpost



class Planet():
    def __init__(self, name: str, settlements: list = []):
        self.name: str = name
        self.settlements: list = settlements
        
    
    def create_outpost(self):
        new_outpost = Outpost()

