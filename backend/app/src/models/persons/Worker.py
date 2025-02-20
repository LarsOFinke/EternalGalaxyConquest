from .Human import Human


class Worker(Human):
    def __init__(self, name: str, employed: bool = False, field_of_work = "unskilled", working: bool = False):
        super().__init__(name=name, category="worker")
        self.employed: bool = employed
        self.field_of_work: str = field_of_work
        self.working: bool = working







if __name__ == "__main__":
    pass
