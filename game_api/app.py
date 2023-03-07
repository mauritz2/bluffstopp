from flask import Flask, request
from flask_socketio import SocketIO, emit
from game_api.game_components import players_in_game, deck, board, turn_state
from game_api.player import Player
from game_api.board_state import get_board_state_for_player

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins=[], logger=True)
#socketio.init_app(app, cors_allowed_origins="*", always_connect=True)

@socketio.on("ADD PLAYER")
def add_player(player_name:str, player_id:str):
    new_player = Player(id=player_id, name=player_name, deck=deck, board=board)
    print(f"Just added a new player with name {new_player.name} and ID {new_player.id}")
    players_in_game.add_player(player_id=new_player.id, player=new_player)
    broadcast_player_names()

@socketio.on("REMOVE PLAYER")
def remove_player(player_id:str):
    players_in_game.remove_player(player_id=player_id)
    broadcast_player_names()

@socketio.on("GET BOARD STATE")
def get_board_state(player_id:str):
    board_state = get_board_state_for_player(player_id)
    emit("UPDATE BOARD STATE", board_state, to=request.sid)

@socketio.on("PLAY CARD")
def play_card(player_id:str, card_str:str):
    player = players_in_game.get_player_instance_by_id(player_id)
    player.play_card(card_str)
    #turn_state.end_current_player_turn()

    # TODO - break out update board state into separate func
    board_state = get_board_state_for_player(player_id)
    emit("UPDATE BOARD STATE", board_state, to=request.sid)

def broadcast_player_names():
    player_names = players_in_game.get_player_names()
    emit("UPDATE PLAYERS", player_names, broadcast=True)
