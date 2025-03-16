from .. import socketio
from flask_socketio import emit
from ..src.models.Game import Game



# Create a server-side list of players and dictionary to store Game objects per session
games: dict = {}
players: list = []



@socketio.on('connect') # Handle WebSocket connection to the game (Frontend will connect to this)
def handle_connect(): 
    print("Connected new Player")
    emit('welcome', {'message': f'Welcome to the game!'})


@socketio.on("register_player")
def register_player(data):
    print("registering...",data)
    user = data["user"]
    players.append(user)


@socketio.on('start_game')  # Handle the start of the game (called when the game begins)
def start_game(data):
    print("starting...",data)
    game = Game()
    host = data["user"]
    games[host] = game
    
    for player in players:
        game.add_player(player)
    players.clear()
    
    game.start()
    game_state = game.fetch_game_state()
    print("starting with game-state:\n", game_state)
    emit("new_game_started", { "host": host, "game_state": game_state })
    print(game.current_player)
    emit('your_turn', {'player': str(game.current_player)})


@socketio.on('player_input')    # Handle player input (this event is triggered by frontend input)
def handle_player_input(data):
    host = data.get("host")
    game = games.get(host)
    
    player = int(data["playerId"])
    if player == game.current_player:
        action = data.get('action')
        result: dict = game.process_player_action(player, action)
        emit('result_player_action', result)


@socketio.on("next_turn")
def next_turn(data):
    print("received next-turn request:", data)
    game = games[data["host"]]
    player = int(data["playerId"])
    
    if game.current_player == player:
        game.next_turn()
        game_state: dict = game.fetch_game_state()
        print("New game state: \n", game_state)
        emit('game_update', game_state)
        emit('your_turn', {'player': str(game.current_player)})


@socketio.on('disconnect')
def handle_disconnect():
    print("Player disconnected")
    games.clear()
