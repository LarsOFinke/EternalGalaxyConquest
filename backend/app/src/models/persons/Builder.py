from .Worker import Worker


class Builder(Worker):
    def __init__(self, name, employed = True, working = False, production: int = 500):
        super().__init__(name=name, employed=employed, field_of_work="Builder", working=working, production=production)