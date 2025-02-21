import asyncio
import websockets
import json



class Game:
    def __init__(self):
        self.round = 1
        self.is_player_turn = True
        self.players = ["Player", "AI"]
        self.player_input = None
        self.ai_input = None
        self.game_over = False


    async def game_loop(self, websocket):
        """
        The main game loop that alternates between player and AI turns.
        """
        while not self.game_over:
            if self.is_player_turn:
                print(f"Round {self.round}: It's the player's turn.")
                await self.wait_for_player_turn(websocket)
            else:
                print(f"Round {self.round}: It's the AI's turn.")
                await self.ai_turn(websocket)
                
            self.round += 1 # Increment round after both turns
            

    async def wait_for_player_turn(self, websocket):
        """
        Waits for the player to make a move.
        """
        print("Waiting for player input...")
        await self.handle_player_input(websocket, None)
        print("Player move received.")
        

    async def handle_player_input(self, websocket, path):
        """
        This method handles player input received via websocket.
        """
        try:
            self.player_input = await websocket.recv()      # Wait for player input (e.g., a move or command)
            print(f"Player's input: {self.player_input}")   # Process the player input here (e.g., update game state, validate move)
            self.is_player_turn = False                     # After the player has made their move, the game will process the AI's turn

            await websocket.send(json.dumps({   # Send back a message to the player indicating their move has been processed
                "message": "Player move processed. It's now the AI's turn.",
                "turn": "ai"
            }))

        except websockets.ConnectionClosed:
            print("Player disconnected.")


    async def ai_turn(self, websocket):
        """
        Simulates the AI's turn and sends the move to the frontend.
        """
        print("AI is making a move...")
        ai_move = {"action": "move", "from": "1,1", "to": "2,2"}    # Simulate AI logic here. For now, we simulate with a dummy move.
        self.ai_input = ai_move
        print(f"AI's move: {self.ai_input}")
        
        await websocket.send(json.dumps({                   # Send the AI move to the frontend
            "message": f"AI has made its move: {ai_move}",
            "turn": "player",                               # Switch turn back to player
            "ai_move": ai_move                              # Send the AI move
        }))

        self.is_player_turn = True   # After the AI's move, it's the player's turn again


    async def websocket_server(self, host='localhost', port=8765):
        """
        WebSocket server to handle player connections.
        """
        async with websockets.serve(self.handle_player_input, host, port):
            print(f"Server started at {host}:{port}")
            await asyncio.Future()  # Run the server forever

    async def start_game(self, host='localhost', port=8765):
        """
        Start the WebSocket server and the game loop.
        """
        # Launch WebSocket server
        async with websockets.serve(self.game_loop, host, port):
            print(f"Server started at {host}:{port}")
            await asyncio.Future()  # Run the server forever
        

# To start the game
if __name__ == "__main__":
    game = Game()
    asyncio.run(game.start_game())



# async with websockets.connect('ws://localhost:8765') as websocket:
#             # Wait for players to connect
#             await asyncio.sleep(1)
#             # Start the game loop after the WebSocket server is set up
#             await self.game_loop(websocket)