from flask import Flask, request
from flask_socketio import SocketIO, emit

from game_api.global_game_components import players_in_game, deck, board, turn_state
from game_api.player import Player
from game_api.game_state import get_public_game_state, get_private_game_state
from game_api.config import logger, NUM_PUNISHMENT_CARDS_TO_DRAW

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins=[])

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
    card_to_start_game = deck.draw_top_card()
    logger.debug(f"Adding {card_to_start_game.card_short} to board")
    board.add_card_to_board(card_to_start_game)
    board.set_last_declared_card(card_to_start_game.card_short)

    turn_state.start_next_turn()
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
    logger.debug(f"Player {player_id} has the following cards {game_state['playerHand']}")

@socketio.on("PLAY CARD")
def play_card(player_id:str, card_actual:str, card_declared:str):
    turn_state.is_first_play_of_game = False
    
    logger.debug(f"Player {player_id} is playing the card {card_actual}, claiming that it is {card_declared}")
    # TODO - bring back for prod - commented out for easier testing
    #if is_invalid_player(player_id):
    #    logger.error("Player {player_id} tried to play a card, but it wasn't their turn")
    #    raise ValueError("It's not your turn to play {player_id}")
    player = players_in_game.get_player_instance_by_id(player_id)
    player.play_card(card_actual)
    board.set_last_declared_card(card_declared)
    turn_state.player_who_played_last_card = player_id
    turn_state.end_current_player_turn()
    
    # Forces all clients to request the new game state - all players have to update so 
    # they know if they are the new player or not. Who is the current player 
    # is determined server side so the clients don't get to know any other player IDs
    # Could also be solved by preventing tapering with the cookie holding the player_id by signing the coookie somehow
    #emit("REQUEST PRIVATE GAME STATE", broadcast=True)
    force_private_game_state_updates()
    broadcast_public_game_state()

@socketio.on("CALL BLUFF")
def call_bluff(player_id_calling_bluff:str):
    #if is_invalid_player():
        # if is_invalid_player(player_id):
        # logger.error("Player {player_id} tried to play a card, but it wasn't their turn")
        # raise ValueError("It's not your turn to play {player_id}")
    # Add assessment if bluff was correct or not and add penalties
    # TODO - debug that the player turn doesn't always reset to the right person here
    logger.debug("Showing the latest played card")
    board.show_card()

    if board.is_bluff():
        logger.debug("It was a bluff - player who bluffed has to draw")
        player_whos_bluff_got_called = players_in_game.get_player_instance_by_id(turn_state.player_who_played_last_card)
        player_whos_bluff_got_called.draw_card(NUM_PUNISHMENT_CARDS_TO_DRAW)
        player_starting_next_round = player_id_calling_bluff        
    else:
        logger.debug("It was not a bluff - player that called bluff has to draw")
        player_calling_bluff = players_in_game.get_player_instance_by_id(player_id_calling_bluff)
        player_calling_bluff.draw_card(NUM_PUNISHMENT_CARDS_TO_DRAW)
        player_starting_next_round = turn_state.player_who_played_last_card

    turn_state.reset_player_turns(new_first_player=player_starting_next_round)
    board.reset_board()

    force_private_game_state_updates() 
    broadcast_public_game_state()

@socketio.on("PASS TURN")
def pass_turn(player_id_passing:str):
    # TODO - this logic has to be re-built to keep a list of all passing players
    # If the list is the same length as the total amount of players there's a reset
    # TODO - implement so you can't pass on an empty board (in UI)
    #if is_invalid_player(player_id_passing):
        # logger.error("Player {player_id} tried to play a card, but it wasn't their turn")
        # raise ValueError("It's not your turn to play {player_id}")
    turn_state.pass_player(player_id_passing)
    
    if turn_state.did_all_players_pass():
        logger.debug("All players passed - {turn_state.player_who_played_last_card} played highest one and will start")
        turn_state.end_current_player_turn()
        turn_state.reset_player_turns(turn_state.player_who_played_last_card)
        board.reset_board()
        # TODO - is it necessary to update private game state here? Merge into one func if these
        # are always used together?
        force_private_game_state_updates()
        broadcast_public_game_state()
    else:
        turn_state.end_current_player_turn()
        force_private_game_state_updates()
        broadcast_public_game_state()


def broadcast_player_names() -> None:
    player_names = players_in_game.get_player_names()
    emit("UPDATE PLAYERS", player_names, broadcast=True)

def broadcast_public_game_state() -> None:
    public_game_state = get_public_game_state()
    emit("UPDATE PUBLIC GAME STATE", public_game_state, broadcast=True) 

def is_invalid_player(player_id:str) -> bool:
    return True if player_id != turn_state.current_player_id else False

def force_private_game_state_updates():
    emit("REQUEST PRIVATE GAME STATE", broadcast=True)