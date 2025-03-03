

class Building():
    def __init__(self, name: str, active: bool = True):
        self.name: str = name
        self.active: bool = active

    def fetch_building_state(self) -> dict:
        building_state: dict = {
            "category": "building",
            "name": self.name
        }
        
        return building_state

