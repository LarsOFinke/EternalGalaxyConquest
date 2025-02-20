from .Factory import Factory


class BuildersHut(Factory):
    def __init__(self, workers: list = []) -> None:
        super().__init__(category="Builders Hut", worker_slots=2, workers=workers)
        
    
    def convert_worker_to_builder(self, worker, location) -> bool:
        if self.convert_worker_to_craftsman("Builders Hut", worker, location):
            return True

        return False
    





if __name__ == "__main__":
    # bh = BuildersHut()
    # print(bh.worker_slots)
    
    pass
    