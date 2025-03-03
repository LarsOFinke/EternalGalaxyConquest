from .Human import Human


class Worker(Human):
    def __init__(self, name: str, employed: bool = False, field_of_work = "unskilled", working: bool = False, production: int = 0):
        super().__init__(name=name, profession="Worker")
        self.employed: bool = employed
        self.field_of_work: str = field_of_work
        self.working: bool = working
        self.production: int = production







if __name__ == "__main__":
    pass
