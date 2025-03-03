

class Human():
    def __init__(self, name: str, category, alive: bool = True):
        self.name: str = name
        self.category: str = category
        self.alive: bool = alive
    
    def fetch_population_state(self) -> dict:
        return {
            "category": "population",
            "name": self.name,
            "alive": self.alive
        }





if __name__ == "__main__":
    pass
