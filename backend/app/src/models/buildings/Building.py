

class Building():
    def __init__(self, name: str, active: bool = True):
        self.name: str = name
        self.active: bool = active

    def fetch_building_state(self) -> dict:
        return {
            "category": "building",
            "name": self.name
        }

