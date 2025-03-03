from .Mine import Mine


class GoldMine(Mine):
    def __init__(self, workers: list = []) -> None:
        super().__init__(name="Gold Mine", worker_slots=2, workers=workers)
        
    
    def convert_worker_to_miner(self, worker, location) -> bool:
        if self.convert_worker_to_craftsman("Gold Mine", worker, location):
            return True

        return False








if __name__ == "__main__":
    pass
