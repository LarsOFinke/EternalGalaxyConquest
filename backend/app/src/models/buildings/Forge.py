from .Factory import Factory


class Forge(Factory):
    def __init__(self, workers: list = []) -> None:
        super().__init__(category="Forge", worker_slots=2, workers=workers)
        
    
    def convert_worker_to_blacksmith(self, worker, location) -> bool:
        if self.convert_worker_to_craftsman("Forge", worker, location):
            return True

        return False







if __name__ == "__main__":
    pass
