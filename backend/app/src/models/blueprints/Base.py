
class Base():
    base_count: int = 0
    
    def __init__(self, name: str, base_type: str, tile_id: int, settlements: list):
        Base.base_count += 1
        self.__base_id: int = Base.base_count
        self.base_type = base_type
        self.name: str = name
        self.__tile_id: int = tile_id
        self.__settlements: list = settlements
    
    def get_base_id(self) -> int:
        return self.__base_id
    
    def set_tile_id(self, tile_id):
        self.__tile_id = tile_id
    
    def get_tile_id(self) -> int:
        return self.__tile_id
    
    def fetch_base_state(self) -> dict:
        return {
            "category": "base",
            "name": self.name,
            "tile_id": self.__tile_id,
            "base_id": self.get_base_id(),
            "base_type": self.base_type,
            "settlement_states": [settlement.fetch_settlement_state() for settlement in self.__settlements]
        }

