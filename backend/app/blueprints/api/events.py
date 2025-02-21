from ... import socketio
from flask import session
from flask_socketio import emit
from ...src.models.Game import Game



# Create an instance of the Game class
game = Game()



# Handle WebSocket connection to the game (Frontend will connect to this)
@socketio.on('connect')
def handle_connect():
    print("Player connected!")
    game.add_player(session["username"])
    emit('welcome', {'message': 'Welcome to the game!'})
    

# Handle the start of the game (called when the game begins)
@socketio.on('start_game')
def start_game():
    game.start_game()  # Start the game logic
    game_state = game.get_game_state()
    emit('game_update', game_state)  # Send the initial game state to the client


# Handle player input (this event is triggered by frontend input)
@socketio.on('player_input')
def handle_player_input(data):
    print(f"Received player input: {data}")
    
    action = data.get('action')
    
    # Process the player action in the game logic
    game.process_player_action(action)
    
    # Emit the updated game state back to the frontend
    game_state = game.get_game_state()
    emit('game_update', game_state)


