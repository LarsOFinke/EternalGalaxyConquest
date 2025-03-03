
class Base():
    base_count: int = 0
    
    def __init__(self):
        Base.base_count += 1
        self.__base_id: int = Base.base_count
    
    def get_base_id(self) -> int:
        return self.__base_id    

