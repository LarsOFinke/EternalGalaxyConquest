from .Worker import Worker


class Woodcutter(Worker):
    def __init__(self, name, employed = True, working = False):
        super().__init__(name=name, employed=employed, field_of_work="Woodcutter", working=working)
