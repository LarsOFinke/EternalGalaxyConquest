from Factory import Factory
from Worker import Worker
from Builder import Builder


class BuildersHut(Factory):
    def __init__(self, workers: list = []) -> None:
        super().__init__(category="Builders hut", worker_slots=2)
        self.__workers: list = workers
    
    
    def get_workers(self) -> list:
        return self.__workers
    
    def __set_workers(self, worker: Builder, increase: bool = True) -> None:
        if increase:
            self.__workers.append(worker)
        else:
            self.__workers.remove(worker)
    
    def add_worker(self, worker: Builder) -> None:
        self.__set_workers(worker)
    
    def remove_worker(self, worker: Builder) -> None:
        self.__set_workers(worker, increase=False)
    
    
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
    # bh = BuildersHut()
    # print(bh.worker_slots)
    
    pass
    