
class Tile():
    def __init__(self, tile_id: int, owner: str, owner_id: int, tile_type: str, tile_name: str, tile_content: dict):
        self.tile_id: int = tile_id
        self.owner: str = owner
        self.owner_id: int = owner_id
        self.tile_type: str = tile_type
        self.tile_name: str = tile_name
        self.tile_content: dict = tile_content
        
    def fetch_tile_state(self):
        tile_content: dict = {}
        
        if self.tile_content.get("base") != None:
            base = self.tile_content.get("base")
            tile_content.update({
                "base_id": base.get_base_id(),
                "planet_name": base.name
            })
        
        return {
            "id": self.tile_id,
            "tile_type": self.tile_type,
            "owner": self.owner,
            "owner_id": self.owner_id,
            "tile_content": tile_content
        }
        