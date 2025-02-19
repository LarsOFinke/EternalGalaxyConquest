from Human import Human


class Worker(Human):
    def __init__(self, name, alive, employed: bool = False):
        super().__init__(name=name, alive=alive)
        self.employed: bool = employed







if __name__ == "__main__":
    pass
