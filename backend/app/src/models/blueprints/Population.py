

class Population():
    population_id = 0
    
    def __init__(self):
        Population.population_id += 1
        self.population_id = Population.population_id
        