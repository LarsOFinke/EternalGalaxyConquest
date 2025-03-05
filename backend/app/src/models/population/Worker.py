from ..blueprints.Human import Human


class Worker(Human):
    def __init__(self, name: str, employed: bool = False, field_of_work = "unskilled", working: bool = False, production: int = 0):
        super().__init__(name=name, profession="worker")
        self.employed: bool = employed
        self.field_of_work: str = field_of_work
        self.working: bool = working
        self.production: int = production

    def fetch_population_state(self) -> dict:
        population_state: dict = super().fetch_population_state()
        population_state.update({
            "employed": self.employed,
            "field_of_work": self.field_of_work,
            "working": self.working,
            "production": self.production
        })
        
        return population_state





if __name__ == "__main__":
    pass
