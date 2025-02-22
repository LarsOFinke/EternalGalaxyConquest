from ... import socketio
from flask_socketio import emit
from ...src.models.Game import Game



# Create a server-side list of players and dictionary to store Game objects per session
games: dict = {}
players: list = []



@socketio.on('connect') # Handle WebSocket connection to the game (Frontend will connect to this)
def handle_connect(): 
    emit('welcome', {'message': f'Welcome to the game!'})


@socketio.on("register_player")
def register_player(data):
    user = data["user"]
    players.append(user)


@socketio.on('start_game')  # Handle the start of the game (called when the game begins)
def start_game(data):
    game = Game()
    host = data["user"]
    games[host] = game
    
    for player in players:
        game.add_player(player)
    players.clear()
    connected_players: list = [{"name": player.name, "player_id": player.player_id} for player in game.players]
    
    
    game.start()
    game_state = game.get_game_state()
    
    emit("players", connected_players)
    emit("host", { "host": host })
    emit('game_update', game_state)
    emit('your_turn', {'player': game.current_player})


@socketio.on('player_input')    # Handle player input (this event is triggered by frontend input)
def handle_player_input(data):
    host = data.get("host")
    game = games.get(host)
    
    if data.get("user_id") == game.current_player:
        payload = data.get('payload')
        result: dict = game.process_player_action(payload)
        game_state: dict = game.get_game_state()
        
        emit('game_update', game_state)
        emit('result_player_action', result)
        emit('your_turn', {'player': game.current_player})


@socketio.on('disconnect')
def handle_disconnect():
    games.clear()
