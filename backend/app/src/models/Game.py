from .Player import Player



class Game:
    def __init__(self) -> None:
        self.players: list[Player] = [Player("AI", 1)]
        self.player_count: int = 1
        self.total_player_count: int = 0
        self.current_player: int = 2
        self.__game_state: dict = {}
        self.__round: int = 0
        self.__tile_states: list[dict] = []
        self.running: bool = False

    def set_tile_states(self, tile_states: list[dict]):
        self.__tile_states = tile_states

    def fetch_game_state(self) -> dict:
        self.__game_state=  {
                                "round": self.__round,
                                "current_player": self.current_player,
                                "player_states": [player.fetch_player_state() for player in self.players],
                                "__tile_states": self.__tile_states
                            }
        
        return self.__game_state
    
    
    def add_player(self, player: str) -> None:
        self.player_count += 1
        new_player = Player(player, self.player_count)
        self.players.append(new_player)

    def start(self) -> None:
        self.total_player_count = len(self.players)
        self.running = True
        self.ai_turn()

    def end(self) -> None:
        self.running = False
    

    def process_player_action(self, payload) -> dict:
        result = self.process_payload(payload)
        result.update({"player": payload["player"]})
        
        return result


    def process_payload(self, payload) -> dict:
        """ 
        ############################################################
        # Player -> bases -> settlements -> buildings / population #
        ############################################################
        
        Payload example:
        {
            "player": 2,
            "category": "locations",
            "target": ["bases",],
            "target_name": "Heimatplanet",
            "action": "Found City",
            "context": ["New Citto", 1000, 1000, 1000, 1000]
        }
        """
        match payload['payload']["category"]:
            case "locations":
                result = self.fetch_location((payload["player"] - 1), payload["payload"].get("location"), payload["payload"].get("target"))
                if result == None:
                    return { "success": False, "message": f"{payload['payload'].get('target')} konnte nicht gefunden werden." } 
                
                elif result["success"]:
                    target = result["target"]
                    payload_return = target.match_payload_action(payload["payload"].get("action"), payload["payload"].get("context"))
                    return payload_return
                
                return result
                
            case "buildings":
                result = self.fetch_building((payload["player"] - 1), payload["payload"].get("location"), payload["payload"].get("target"))
                if result == None:
                    return { "success": False, "message": f"{payload['payload'].get('target')} konnte nicht gefunden werden." } 
                
                elif result["success"]:
                    target = result["target"]
                    payload_return = target.match_payload_action(payload["payload"].get("action"), payload["payload"].get("context"))
                    return payload_return
                
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
                    return  { "success": False, "message": e }
                        
            case "settlements":
                try:
                    base = self.players[player].match_payload_action(action="Select Base", context=[location[1],])["target"]
                    return base.match_payload_action(action="Select Settlement", context=[target,])
                
                except Exception as e:
                    return  { "success": False, "message": e }
        
                
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
     
  
