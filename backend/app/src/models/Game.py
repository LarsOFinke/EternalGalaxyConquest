from .Player import Player



class Game:
    def __init__(self) -> None:
        self.players: list[Player] = [Player("AI", 1)]
        self.player_count: int = 1
        self.total_player_count: int = 0
        self.current_player: int = 1
        self.game_state: dict = {}
        self.running: bool = False


    def add_player(self, player: str) -> None:
        self.player_count += 1
        new_player = Player(player, self.player_count)
        self.players.append(new_player)

    def start(self) -> None:
        self.total_player_count = len(self.players)
        self.game_state={
                            "current_player": self.current_player
                        }
        self.running = True
        self.ai_turn()

    def end(self) -> None:
        self.running = False

    def get_game_state(self) -> dict:
        return self.game_state
    

    def process_player_action(self, payload) -> dict:
        """ Payload example:
        {
            "player": 2,
            "category": "locations",
            "target": ["bases",],
            "target_name": "Heimatplanet",
            "action": "Build City",
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
        match payload["category"]:
            case "locations":
                result = self.fetch_location((payload["player"] - 1), payload["location"], payload["target"])
                if result["success"]:
                    target = result["target"]
                    payload_return = target.match_payload_action(payload["action"], payload["context"])
                    return payload_return
                
                return result
                
            # case "buildings":
            #     self.match_buildings(payload)
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
                return self.players[player].match_payload_action(action="Select Base", context=[target,])
                        
            case "settlements":
                base = self.players[player].match_payload_action(action="Select Base", context=[location[1],])["target"]
                return base.match_payload_action(action="Select Settlement", context=[target,])
        
                
    # def match_buildings(self, payload):
    #     match payload["target"]:
    #         case "Headquarter":
    #             pass
          
              
    # def match_persons(self, payload):
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
     
  