

class Building():
    building_count = 0
    
    def __init__(self, name: str, active: bool = True):
        Building.building_count += 1
        self.building_id = Building.building_count
        self.name: str = name
        self.active: bool = active

    def fetch_building_state(self) -> dict:
        return {
            "category": "building",
            "name": self.name,
            "active": self.active,
            "building_id": self.building_id
        }

