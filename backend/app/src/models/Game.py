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
    

    def process_player_action(self, payload):
        """ Payload example:
        {
            "player": 2,
            "category": "locations",
            "target": "bases",
            "target_name": "Heimatplanet",
            "action": "Build City",
            "context": ["New Citto", 1000, 1000, 1000, 1000]
        }
        """
        ############################################################
        # Player -> bases -> settlements -> buildings / population #
        ############################################################
        self.process_payload(payload)
        
        self.next_turn()


    def process_payload(self, payload):
        match payload["category"]:
            case "locations":
                self.match_locations(payload) 
                
            # case "buildings":
            #     self.match_buildings(payload)
            
            # case "population":
            #     self.match_persons(payload)

                
    def match_locations(self, payload):
        match payload["target"]:
            case "bases":
                self.players[payload["player"] - 1].process_base_action(payload)
                        
            case "settlements":
                pass
        
                
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
     
  