from .Building import Building


class Factory(Building):
    def __init__(self, category: str, worker_slots: int = 0, active: bool = True):
        super().__init__(category=category, active=active)
        self.worker_slots: int = worker_slots

    # Method that takes workers etc as parameters





if __name__ == "__main__":
    pass
