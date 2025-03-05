from .Population import Population


class Human(Population):
    def __init__(self, name: str, profession, alive: bool = True):
        self.name: str = name
        self.profession: str = profession
        self.alive: bool = alive
    
    def fetch_population_state(self) -> dict:
        return {
            "category": "population",
            "name": self.name,
            "alive": self.alive
        }





if __name__ == "__main__":
    pass
