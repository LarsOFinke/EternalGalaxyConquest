from ..blueprints.Base import Base



class Planet(Base):
    def __init__(self, name: str, base_type = "planet", tile_id: int = 0, settlements: list = []):
        super().__init__(name=name, base_type=base_type, tile_id=tile_id, settlements=settlements)

