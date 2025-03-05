

class Population():
    population_id = 0
    
    def __init__(self, name: str, profession, alive: bool = True):
        Population.population_id += 1
        self.__population_id = Population.population_id
        self.name: str = name
        self.profession: str = profession
        self.alive: bool = alive
    
    def get_population_id(self) -> int:
        return self.__population_id
    
    def fetch_population_state(self) -> dict:
        return {
            "population_id": self.__population_id,
            "category": "population",
            "name": self.name,
            "alive": self.alive
        }
    
    
    