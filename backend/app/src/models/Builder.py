from Worker import Worker


class Builder(Worker):
    def __init__(self, name, employed = True, field_of_work="builder", working = False):
        super().__init__(name=name, employed=employed, field_of_work=field_of_work, working=working)