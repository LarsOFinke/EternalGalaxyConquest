from .Player import Player
from .locations.Planet import Planet



class Game:
    def __init__(self) -> None:
        self.players: list[Player] = [Player("AI", 1)]
        self.player_count: int = 1
        self.total_player_count: int = 0
        self.current_player: int = 2
        self.__game_state: dict = {}
        self.__round: int = 0
        self.__tile_count: int = 12
        self.__tile_states: list[dict] = []
        self.__unclaimed_planets: list = []
        self.running: bool = False

    def set_tile_states(self, tile_states: list[dict]):
        self.__tile_states = tile_states

    def set_base_tiles(self, tile_states: list[dict]):
        for tile_state in tile_states:
            owner_id: int = tile_state.get("owner_id") 
            
            if owner_id != 0:
                tile_id: int = int(tile_state.get("id"))
                base_id: int = int(tile_state["tile_content"].get("base_id"))
                planet_name = tile_state["tile_content"]["planet_name"]

                for base in self.players[int(owner_id) - 1].get_bases():
                    if base.get_base_id() == base_id:
                        base.set_tile_id(tile_id)
                        base.name = planet_name
                
    def fetch_game_state(self) -> dict:
        self.__game_state =  {
                                "round": self.__round,
                                "current_player": self.current_player,
                                "player_states": [player.fetch_player_state() for player in self.players],
                                "tile_states": self.__tile_states
                            }
        
        return self.__game_state
    
    
    
    def add_player(self, player: str) -> None:
        self.player_count += 1
        new_player = Player(player, self.player_count)
        self.players.append(new_player)

    def spawn_game_field(self) -> list[dict]:
        """
        {
            id: i,
            tile_type: "home_planet",
            owner: this.__players[0],
            owner_id: player_id,
            tile_content: {
                tile_name: `Heimat von ${this.__players[0].name}`,
                planet_name: `${this.__players[0].name}'s Planet`,
                base_id: id,
            }
        }
        """
        game_field: list[dict] = []

        for i in range(self.__tile_count):
            tile_id: int = (i + 1)
            if i == 1:
                owner = self.players[0].name
                owner_id = self.players[0].player_id
                tile_type = "home_planet"
                tile_name = f"Heimat von {self.players[0].name}"
                tile_content = {
                    "planet_name": f"{self.players[0].name}'s Planet",
                    "base_id": self.players[0].get_bases()[0].get_base_id()
                }
                
            elif i == 4 or i == 7:
                owner = "free"
                owner_id = 0
                tile_type = "center_planet"
                tile_name = f"Tile #{(i + 1)}"
                planet_name = f"Unbeanspruchter Planet"
                
                self.__unclaimed_planets.append(Planet(planet_name, tile_id)) 
                base_id: int = [planet.get_base_id() for planet in self.__unclaimed_planets if planet.get_tile_id() == tile_id][0]
                
                tile_content = {
                    "planet_name": planet_name,
                    "base_id": base_id
                }

            elif i == 10:
                owner = self.players[1].name
                owner_id = self.players[1].player_id
                tile_type = "home_planet"
                tile_name = f"Heimat von {self.players[1].name}"
                tile_content = {
                    "planet_name": f"{self.players[1].name}'s Planet",
                    "base_id": self.players[1].get_bases()[0].get_base_id()
                }

            else:
                owner = "free"
                owner_id = 0
                tile_type = "space"
                tile_name = f"Tile #{(i + 1)}"
                tile_content = {
                    "planet_name": f"No Planet"
                }
                
                            
            game_field.append({
                "id": tile_id,
                "owner": owner,
                "owner_id": owner_id,
                "tile_type": tile_type,
                "tile_name": tile_name,
                "tile_content": tile_content
            })
        
        return game_field

    def start(self) -> None:
        self.total_player_count = len(self.players)
        self.__tile_states = self.spawn_game_field()
        self.set_base_tiles(self.__tile_states)
        self.running = True
        self.ai_turn()

    def end(self) -> None:
        self.running = False


    def process_player_action(self, player, action) -> dict:
        result = self.process_action((player - 1), action)
        result.update({"player": (player + 1)})
        
        return result


    def process_action(self, player, action) -> dict:
        """ 
        ############################################################
        # Player -> bases -> settlements -> buildings / population #
        ############################################################
        
        Payload example:
        {
            "category": "locations",
            "location": ["settlements", "admin's Planet"],
            "target": "Hauptstadt",
            "action": "Build",
            "context": ["Builders Hut",]
        }
        """
        match action["category"]:
            case "locations":
                result = self.fetch_location(player, action.get("location"), action.get("target"))
                if result == None:
                    return { "success": False, "message": f"{action.get('target')} konnte nicht gefunden werden." } 
                
                elif result["success"]:
                    target = result.get("target")
                    action_return = target.match_payload_action(action.get("action"), action.get("context"))
                    return action_return
                
                return result
                
            case "buildings":
                result = self.fetch_building(player, action.get("location"), action.get("target"))
                if result == None:
                    return { "success": False, "message": f"{action.get('target')} konnte nicht gefunden werden." } 
                
                elif result["success"]:
                    target = result.get("target")
                    action_return = target.match_payload_action(action.get("action"), action.get("context"))
                    return action_return
                
                return result
            
            # case "population":
            #     self.match_persons(payload)

                
    def fetch_location(self, player, location: list, target: str) -> dict:
        """Fetch the target location-object for further processing like calling methods.

        Args:
            player: The Player's ID in the game.
            location (list): A list of locations where the target is to find.
            target: The target's name.

        Returns:
            dict: {"success": bool, "result": result}
        """
        match location[0]:  # The list-attribute where the object is in
            case "bases":
                try:
                    return self.players[player].match_payload_action(action="Select Base", context=[target,])
                
                except Exception as e:
                    return  { "success": False, "message": f"{e}" }
                        
            case "settlements":
                try:
                    base = self.players[player].match_payload_action(action="Select Base", context=[location[1],])["target"]
                    return base.match_payload_action(action="Select Settlement", context=[target,])
                
                except Exception as e:
                    return  { "success": False, "message": f"{e}" }
        
                
    def fetch_building(self, player, location: list, target: str) -> dict:
        match location[0]:
            case "factory":
                base = self.players[player].match_payload_action(action="Select Base", context=[location[2],])["target"]
                settlement = base.match_payload_action(action="Select Settlement", context=[location[1],])["target"]
                result = settlement.match_payload_action(action="Select Building", context=[target,])
                if result == None:
                    return  { "success": False, "message": f"{target} konnte nicht gefunden werden." } 
                
                return result
                
          
              
    # def fetch_person(self, payload):
    #     match payload["person"]:
    #         case "Worker":
    #             pass
            
    #         case "Builder":
    #             pass
            

    def ai_turn(self):
        """Handle the AI's turn logic."""
        
        self.next_turn()


    def check_next_player(self) -> int:
        if self.current_player < self.total_player_count:
            return self.current_player + 1
        else:
            return 1

    def next_turn(self) -> None:
        self.current_player = self.check_next_player()
        self.__game_state['current_player'] = self.current_player
        
        if self.current_player == 1:
            self.__round += 1
            self.ai_turn()
     
  
