from .Worker import Worker


class Blacksmith(Worker):
    def __init__(self, name, employed = True, working = False, production: int = 500):
        super().__init__(name=name, employed=employed, field_of_work="Blacksmith", working=working, production=production)

    # def fetch_population_state(self) -> dict:
    #     population_state: dict = super().fetch_population_state()
    #     population_state.update({

    #     })
        
    #     return population_state
    
