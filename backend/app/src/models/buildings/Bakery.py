from .Factory import Factory


class Bakery(Factory):
    def __init__(self, workers: list = []) -> None:
        super().__init__(name="Bakery", worker_slots=2, workers=workers)
        
    
    def convert_worker_to_baker(self, worker, location) -> bool:
        if self.convert_worker_to_craftsman("Bakery", worker, location):
            return True

        return False







if __name__ == "__main__":
    pass
