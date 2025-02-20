from Factory import Factory
from Worker import Worker
from Builder import Builder


class BuildersHut(Factory):
    def __init__(self, workers: list = []):
        super().__init__(category="Builders hut", worker_slots=2)
        self.workers: list = workers
    
    # Method to convert a worker to a builder
    def convert_worker_to_builder(self, worker: Worker, location) -> bool:
        if isinstance(worker, Worker):
            new_builder = Builder(worker.name)
            location.remove_population(worker)
            location.remove_free_worker(worker)
            del worker
            location.add_free_builder(new_builder)
            
            
            return True

        return False
    





if __name__ == "__main__":
    bh = BuildersHut()
    print(bh.worker_slots)
    
    pass
    