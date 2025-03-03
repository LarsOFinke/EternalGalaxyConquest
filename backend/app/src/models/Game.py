from .Player import Player



class Game:
    def __init__(self) -> None:
        self.players: list[Player] = [Player("AI", 1)]
        self.player_count: int = 1
        self.total_player_count: int = 0
        self.current_player: int = 1
        self.game_state: dict = {}
        self.running: bool = False

    def fetch_game_state(self) -> dict:
        self.game_state={
                            "current_player": self.current_player,
                            "player_states": [player.fetch_player_state() for player in self.players]
                        }
        
        return self.game_state
    
    
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
        """ Payload example:
        {
            "player": 2,
            "category": "locations",
            "target": ["bases",],
            "target_name": "Heimatplanet",
            "action": "Found City",
            "context": ["New Citto", 1000, 1000, 1000, 1000]
        }
        """
        ############################################################
        # Player -> bases -> settlements -> buildings / population #
        ############################################################
        result = self.process_payload(payload)
        result.update({"player": payload["player"]})
        
        self.next_turn()
        return result


    def process_payload(self, payload) -> dict:
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
        self.game_state['current_player'] = self.current_player
        
        if self.current_player == 1:
            self.ai_turn()
     
  
