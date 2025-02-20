from .Worker import Worker


class Blacksmith(Worker):
    def __init__(self, name, employed = True, working = False):
        super().__init__(name=name, employed=employed, field_of_work="Blacksmith", working=working)


