from .Mine import Mine


class IronMine(Mine):
    def __init__(self, workers: list = []) -> None:
        super().__init__(name="Iron Mine", worker_slots=2, workers=workers)
        
    
    def convert_worker_to_miner(self, worker, location) -> bool:
        if self.convert_worker_to_craftsman("Iron Mine", worker, location):
            return True

        return False







if __name__ == "__main__":
    pass
