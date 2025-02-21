

class Game:
    def __init__(self) -> None:
        self.player_list: list[str] = ["AI"]
        self.players: list[dict] = [{"id": 1, "name": "AI"}]
        self.player_count: int = 1
        self.total_player_count: int = 0
        self.current_player: int = 1
        self.game_state: dict = {}
        self.running: bool = False


    def add_player(self, player: str) -> None:
        self.player_list.append(player)
        self.player_count += 1
        self.players.append({
                                "id": self.player_count,
                                "name": player
                            })

    def start(self) -> None:
        self.total_player_count = len(self.player_list)
        self.game_state={
                            "players": self.players, 
                            "current_player": self.current_player
                        }
        self.running = True
        self.ai_turn()

    def end(self) -> None:
        self.running = False

    def get_game_state(self) -> dict:
        return self.game_state
    

    def process_player_action(self, action: str):
        """Process the player's action (this would be triggered by player input)."""
        
        self.next_turn()


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
     
  