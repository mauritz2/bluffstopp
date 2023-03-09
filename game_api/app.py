import logging
import sys

from flask import Flask, request
from flask_socketio import SocketIO, emit

from game_api.global_game_components import players_in_game, deck, board, turn_state
from game_api.player import Player
from game_api.game_state import get_public_game_state, get_private_game_state

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins=[], logger=True)

logging.basicConfig(stream=sys.stderr, level=logging.DEBUG)
logger = logging.getLogger(__name__)

@socketio.on("ADD PLAYER")
def add_player(player_name:str, player_id:str):
    logger.debug(f"Adding player with name {player_name} and id {player_id}")
    new_player = Player(id=player_id, name=player_name, deck=deck, board=board)
    players_in_game.add_player(player_id, new_player)
    turn_state.add_player(player_id)
    broadcast_player_names()

@socketio.on("REMOVE PLAYER")
def remove_player(player_id:str):
    logger.debug(f"Removing player with id {player_id}")
    players_in_game.remove_player(player_id)
    turn_state.remove_player(player_id)
    broadcast_player_names()

@socketio.on("START GAME")
def start_game():
    turn_state.start_turn()
    # TODO - weird here that we only broadcast public game state? It's because private has to be requested
    # Maybe there's a better way to do this - e.g. tie the player_id to a request.SID, but 
    # haven't been able to make that work in the past. The request.SID just keeps changing
    broadcast_public_game_state()
    # TODO - evaluate whether this is needed - right now this is the only way to trigger a
    # private game update from the server since only the client can generate the correct
    # UUID/request.SID combo
    emit("REQUEST PRIVATE GAME STATE", broadcast=True)

@socketio.on("GET PRIVATE GAME STATE")
def get_game_state(player_id:str):
    game_state = get_private_game_state(player_id)
    emit("UPDATE PRIVATE GAME STATE", game_state, to=request.sid)

@socketio.on("PLAY CARD")
def play_card(player_id:str, card_str:str):
    logger.debug("Player {player_id} is playing the card {card_str}")
    # TODO - bring back for prod - commented out for easier testing
    #if is_invalid_player(player_id):
    #    logger.error("Player {player_id} tried to play a card, but it wasn't their turn")
    #    raise ValueError("It's not your turn to play {player_id}")
    player = players_in_game.get_player_instance_by_id(player_id)
    player.play_card(card_str)    
    turn_state.end_current_player_turn()
    # TODO - break out update private state into separate func, if possible
    game_state = get_private_game_state(player_id)
    emit("UPDATE PRIVATE GAME STATE", game_state, to=request.sid)
    broadcast_public_game_state()

@socketio.on("CALL BLUFF")
def call_bluff(player_id_calling_bluff):
    #if is_invalid_player():
        # if is_invalid_player(player_id):
        # logger.error("Player {player_id} tried to play a card, but it wasn't their turn")
        # raise ValueError("It's not your turn to play {player_id}")
    # Add assessment if bluff was correct or not and add penalties
    logger.debug("Showing the latest played card")
    board.show_card()
    broadcast_public_game_state()

def broadcast_player_names() -> None:
    player_names = players_in_game.get_player_names()
    emit("UPDATE PLAYERS", player_names, broadcast=True)

def broadcast_public_game_state() -> None:
    public_game_state = get_public_game_state()
    emit("UPDATE PUBLIC GAME STATE", public_game_state, broadcast=True)

def is_invalid_player(player_id:str) -> bool:
    return True if player_id != turn_state.current_player_id else False
