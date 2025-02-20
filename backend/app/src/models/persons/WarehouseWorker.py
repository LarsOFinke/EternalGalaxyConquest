from .Worker import Worker


class WarehouseWorker(Worker):
    def __init__(self, name, employed = True, working = False):
        super().__init__(name=name, employed=employed, field_of_work="WarehouseWorker", working=working)

