from ... import socketio
from flask import session
from flask_socketio import emit
from ...src.models.Game import Game



# Create an instance of the Game class
game = Game()



@socketio.on('connect') # Handle WebSocket connection to the game (Frontend will connect to this)
def handle_connect():
    user: str = session.get("username")
    game.add_player(user)
    emit('welcome', {'message': f'Welcome to the game, {user}!', "user_id": game.players[-1]["id"]})
    

@socketio.on('start_game')  # Handle the start of the game (called when the game begins)
def start_game():
    game.start()
    game_state = game.get_game_state()
    emit('game_update', game_state)
    emit('your_turn', {'player': game.current_player})


@socketio.on('player_input')    # Handle player input (this event is triggered by frontend input)
def handle_player_input(data):
    if data["user_id"] == game.current_player:
        action = data.get('action')
        
        game.process_player_action(action)
        
        game_state = game.get_game_state()
        emit('game_update', game_state)
        emit('your_turn', {'player': game.current_player})

