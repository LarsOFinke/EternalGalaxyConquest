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
    
    def fetch_building_state(self) -> dict:
        building_state: dict = super().fetch_building_state()
        building_state.update({
            "worker_slots": self.worker_slots,
            "workers": self.__workers
        })
        
        return building_state
    
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
    
    
    def convert_worker_to_craftsman(self, building: str, worker_id, settlement) -> bool:
        worker = settlement.select_population(worker_id)["target"]
        
        if isinstance(worker, Worker):
            new_craftsman = Factory.build_options[building](worker.name)
            settlement.remove_population(worker)
            settlement.set_free_workers(worker, False)
            del worker
            settlement.add_population(new_craftsman)
            
            if building == "Builders hut":
                settlement.add_free_builder(new_craftsman)
            
            return { 
                    "success": True, "message": f"{new_craftsman.name} wurde zum Baumeister!",
                    "update": {
                            "action": "Convert Worker",
                            "settlement_id": settlement.get_settlement_id(),
                            "old_population_id": worker_id,
                            "population_id": new_craftsman.get_population_id(),
                            "name": new_craftsman.name,
                            "profession": new_craftsman.profession,
                            "alive": new_craftsman.alive,
                            "employed": new_craftsman.employed,
                            "field_of_work": new_craftsman.field_of_work,
                            "working": new_craftsman.working,
                            "production": new_craftsman.production
                        } 
                    }

        return { "success": False, "message": f"{worker.name} konnte nicht zum Baumeister werden!" }

    # Method that takes workers etc as parameters to occupy them during work !?
