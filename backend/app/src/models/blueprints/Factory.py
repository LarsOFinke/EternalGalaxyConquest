from .Building import Building
from ..population.Worker import Worker; from ..population.Builder import Builder; from ..population.WarehouseWorker import WarehouseWorker; from ..population.Baker import Baker;
from ..population.Woodcutter import Woodcutter; from ..population.Miner import Miner; from ..population.Blacksmith import Blacksmith


class Factory(Building):
    build_options: dict =   {
                                "Builders Hut": Builder,
                                "Warehouse": WarehouseWorker,
                                "Bakery": Baker,
                                "Sawmill": Woodcutter,
                                "Gold Mine": Miner,
                                "Iron Mine": Miner,
                                "Forge": Blacksmith,
                            }
    
    def __init__(self, name: str, worker_slots: int = 0, workers = [], active: bool = True):
        super().__init__(name=name, active=active)
        self.worker_slots: int = worker_slots
        self.__workers: list = workers
    
    
    def get_workers(self, dump) -> list:
        return  { "success": True, "workers": self.__workers }
    
    def __set_workers(self, worker: Builder, increase: bool = True) -> None:
        if increase:
            self.__workers.append(worker)
        else:
            self.__workers.remove(worker)
    
    def add_worker(self, worker: Builder) -> None:
        self.__set_workers(worker)
        return  { "success": True }
    
    def remove_worker(self, worker: Builder) -> None:
        self.__set_workers(worker, increase=False)
        return  { "success": True }
    
    
    def __convert_worker_to_craftsman(self, building: str, worker: Worker, location) -> bool:
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

    # Method that takes workers etc as parameters to occupy them during work





if __name__ == "__main__":
    pass
