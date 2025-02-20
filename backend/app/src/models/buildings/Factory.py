from .Building import Building
from ..persons.Worker import Worker; from ..persons.Builder import Builder; from ..persons.WarehouseWorker import WarehouseWorker; from ..persons.Baker import Baker;
from ..persons.Woodcutter import Woodcutter; from ..persons.Miner import Miner; from ..persons.Blacksmith import Blacksmith


class Factory(Building):
    build_options: dict = {
            "Builders Hut": Builder,
            "Warehouse": WarehouseWorker,
            "Bakery": Baker,
            "Sawmill": Woodcutter,
            "Gold Mine": Miner,
            "Iron Mine": Miner,
            "Forge": Blacksmith,
        }
    
    def __init__(self, category: str, worker_slots: int = 0, workers = [], active: bool = True):
        super().__init__(category=category, active=active)
        self.worker_slots: int = worker_slots
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
    
    
    def convert_worker_to_craftsman(self, building: str, worker: Worker, location) -> bool:
        if isinstance(worker, Worker):
            new_craftsman = Factory.build_options[building](worker.name)
            location.remove_population(worker)
            location.remove_free_worker(worker)
            del worker
            location.add_population(new_craftsman)
            
            if building == "Builders hut":
                location.add_free_builder(new_craftsman)
            
            return True

        return False

    # Method that takes workers etc as parameters





if __name__ == "__main__":
    pass
