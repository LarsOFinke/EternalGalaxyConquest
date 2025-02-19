from Building import Building


class Factory(Building):
    def __init__(self, active: bool = False, worker_slots: int = 0):
        super().__init__(active=active)
        self.worker_slots: int = worker_slots







if __name__ == "__main__":
    pass
