from ... import socketio
from flask import session
from flask_socketio import emit
from ...src.models.Game import Game



# Create a server-side dictionary to store Game objects per session
games = {}


@socketio.on('connect') # Handle WebSocket connection to the game (Frontend will connect to this)
def handle_connect():
    user: str = session.get("username")
    # Create an instance of the Game class
    game = Game()
    games[user] = game  # Map the game to the user
    
    game.add_player(user)
    emit('welcome', {'message': f'Welcome to the game, {user}!', "user_id": game.players[-1].player_id})
    

@socketio.on('start_game')  # Handle the start of the game (called when the game begins)
def start_game():
    # Retrieve the game object associated with this user
    user = session.get("username")
    game = games.get(user)
    game.start()
    game_state = game.get_game_state()
    emit('game_update', game_state)
    emit('your_turn', {'player': game.current_player})


@socketio.on('player_input')    # Handle player input (this event is triggered by frontend input)
def handle_player_input(data):
    # Retrieve the game object associated with this user
    user = session.get("username")
    game = games.get(user)
    if data["user_id"] == game.current_player:
        action = data.get('action')
        
        game.process_player_action(action)
        
        game_state = game.get_game_state()
        emit('game_update', game_state)
        emit('your_turn', {'player': game.current_player})


@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')
    
