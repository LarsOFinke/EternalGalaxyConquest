from .Factory import Factory
from ..persons.WarehouseWorker import WarehouseWorker


class Warehouse(Factory):
    def __init__(self, workers: list = []) -> None:
        super().__init__(category="Warehouse", worker_slots=2)
        self.__workers: list = workers
    
    
    def get_workers(self) -> list:
        return self.__workers
    
    def __set_workers(self, worker: WarehouseWorker, increase: bool = True) -> None:
        if increase:
            self.__workers.append(worker)
        else:
            self.__workers.remove(worker)
    
    def add_worker(self, worker: WarehouseWorker) -> None:
        self.__set_workers(worker)
    
    def remove_worker(self, worker: WarehouseWorker) -> None:
        self.__set_workers(worker, increase=False)
    
    
    def convert_worker_to_wh_worker(self, worker: WarehouseWorker, location) -> bool:
        if isinstance(worker, WarehouseWorker):
            new_wh_worker = WarehouseWorker(worker.name)
            location.remove_population(worker)
            location.remove_free_worker(worker)
            del worker
            location.add_population(new_wh_worker)
            location.add_free_builder(new_wh_worker)
            
            return True

        return False
 







if __name__ == "__main__":
    pass
