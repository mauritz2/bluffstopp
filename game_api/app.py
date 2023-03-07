from flask import Flask, request
from flask_socketio import SocketIO, emit
from game_api.global_game_components import players_in_game, deck, board, turn_state
#from game_api.create_game_components import create_players_in_game, create_deck, create_board, create_turn_state
from game_api.player import Player
from game_api.board_state import get_board_state_for_player

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins=[], logger=True)
#socketio.init_app(app, cors_allowed_origins="*", always_connect=True)

# Option 1
# Timely instantiation done in create_game_components.py controlled by app.py 
# - Challenge: Reflecting the new instances is tough

# Option 2
# Make the turn class instantiatable with None-values
# - Challenge: Reflecting the new instance (?). No, because you just modify it through methods.
# - Challenge: Supporting a TurnState class that can be instantiated with Nones
# - Challenge: Having to add players to two instances is inelegant

# Option 3
# Build a over-arching game manager that holds all the objects. Instantiate it in app.py and get rid of create_game_components
# - Challenge: What does this change? Just makes it slightly easier to keep one global object in app.py
# - Breaks SRP because the game state serialization would have to go into this class



@socketio.on("ADD PLAYER")
def add_player(player_name:str, player_id:str):
    new_player = Player(id=player_id, name=player_name, deck=deck, board=board)
    print(f"Just added a new player with name {new_player.name} and ID {new_player.id}")
    players_in_game.add_player(player_id, new_player)
    turn_state.add_player(player_id)
    print(f"\n\n ADDED PLAYER: now turn_state player_ids are {turn_state.player_ids}")
    broadcast_player_names()

@socketio.on("REMOVE PLAYER")
def remove_player(player_id:str):
    players_in_game.remove_player(player_id)
    turn_state.remove_player(player_id)
    broadcast_player_names()

@socketio.on("START GAME")
def start_game():
    print(f"\n\n At this point the turnstate player_ids are {turn_state.player_ids}")
    turn_state.start_turn()
    # TODO - add logic for redirection here

@socketio.on("GET BOARD STATE")
def get_board_state(player_id:str):

    print(f"\n\n At this point the turnstate current player is {turn_state.current_player_id}")

    board_state = get_board_state_for_player(player_id)
    emit("UPDATE BOARD STATE", board_state, to=request.sid)

@socketio.on("PLAY CARD")
def play_card(player_id:str, card_str:str):
    player = players_in_game.get_player_instance_by_id(player_id)
    player.play_card(card_str)
    turn_state.end_current_player_turn()
    # TODO - break out update board state into separate func
    board_state = get_board_state_for_player(player_id)
    emit("UPDATE BOARD STATE", board_state, to=request.sid)

def broadcast_player_names():
    player_names = players_in_game.get_player_names()
    emit("UPDATE PLAYERS", player_names, broadcast=True)
