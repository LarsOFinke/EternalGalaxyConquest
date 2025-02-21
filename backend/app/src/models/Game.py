

class Game:
    def __init__(self, current_player_id: int = 1, 
                 players: list = [{"id": 1, "name": "AI"}]):
        self.current_player = current_player_id
        self.players = players
        self.running = False
        self.game_state = {"players": self.players, "current_player": self.current_player, "turn": 1}

    def start_game(self):
        """Start the game, initializing necessary values."""
        self.running = True
        self.game_state['turn'] = 1
        self.game_state['current_player'] = self.players[0]['id']
        print("Game started!")

    def end_game(self):
        """End the game."""
        self.running = False
        print("Game over!")


    def process_player_action(self, action: str):
        """Process the player's action (this would be triggered by player input)."""
        if action == "move_left":
            # Example action, modify game state accordingly
            self.game_state['turn'] += 1
            print(f"Player moved left on turn {self.game_state['turn']}")
        else:
            print(f"Unknown action: {action}")


    def ai_turn(self):
        """Handle the AI's turn logic."""
        print(f"AI's turn (turn {self.game_state['turn']})")
        # AI action here, for example:
        self.game_state['turn'] += 1


    def get_game_state(self):
        """Return the current game state."""
        return self.game_state


    def next_turn(self):
        """Advance the game to the next turn."""
        self.game_state['turn'] += 1
        self.current_player = (self.current_player % len(self.players)) + 1  # Cycle players
        self.game_state['current_player'] = self.current_player
