

class Game:
    def __init__(self) -> None:
        self.player_list: list[str] = []
        self.players: list[dict] = []
        self.player_count: int = 0
        self.current_player: int = 0
        self.game_state: dict = {}
        self.running: bool = False

    def add_player(self, player: str) -> None:
        self.player_list.append(player)

    def start(self) -> None:
        self.players = [{i: e} for i, e in enumerate(self.player_list, 2)]  # Reserve id=1 for AI
        self.player_list.insert(0, "AI")
        self.players.insert(0, {"id": 1, "name": "AI"})
        self.player_count = len(self.player_list)
        self.current_player = 1
        self.game_state={
                            "players": self.players, 
                            "current_player": self.current_player
                        }
        self.running = True

    def end(self) -> None:
        self.running = False

    def get_game_state(self) -> dict:
        return self.game_state
    

    def process_player_action(self, action: str):
        """Process the player's action (this would be triggered by player input)."""
        pass


    def ai_turn(self):
        """Handle the AI's turn logic."""
        pass


    def check_next_player(self) -> int:
        if self.current_player < self.player_count:
            return self.current_player + 1
        else:
            return 1

    def next_turn(self):
        self.check_next_player = self.check_next_player()
        self.game_state['current_player'] = self.current_player
    
  