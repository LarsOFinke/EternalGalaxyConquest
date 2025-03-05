from ..blueprints.Factory import Factory


class Warehouse(Factory):
    def __init__(self, workers: list = [], 
                    storage_capacity = {
                        "gold": 2000,
                        "food": 2000,
                        "wood": 2000,
                        "iron": 2000
                    },
                    current_stock = {
                        "gold": 0,
                        "food": 0,
                        "wood": 0,
                        "iron": 0
                    }
                 ) -> None:
        super().__init__(name="Warehouse", worker_slots=2, workers=workers)
        self.storage_capacity: dict = storage_capacity
        self.__current_stock: dict = current_stock
    
    
    def get_current_stock(self) -> dict:
        return self.__current_stock
    
    
    def convert_worker_to_wh_worker(self, worker, location) -> bool:
        if self.convert_worker_to_craftsman("Warehouse", worker, location):
            return True

        return False
 







if __name__ == "__main__":
    pass
