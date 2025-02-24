from .Factory import Factory


class Sawmill(Factory):
    def __init__(self, workers: list = []) -> None:
        super().__init__(category="Sawmill", worker_slots=2, workers=workers)
        
    
    def convert_worker_to_woodcutter(self, worker, location) -> bool:
        if self.convert_worker_to_craftsman("Sawmill", worker, location):
            return True

        return False








if __name__ == "__main__":
    pass
