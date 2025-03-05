from ..blueprints.Human import Human


class Commander(Human):
    def __init__(self, name):
        super().__init__(name=name, profession="leader")
    
    # def fetch_population_state(self) -> dict:
    #     population_state: dict = super().fetch_population_state()
    #     population_state.update({

    #     })
        
    #     return population_state

