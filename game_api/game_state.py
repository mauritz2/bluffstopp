from game_api.app import players_in_game, turn_state, board
from game_api.config import logging

def get_public_game_state():
    public_game_state = {}
    public_game_state["currentPlayerName"] = _get_current_player_name()
    public_game_state["lastActualCard"] = _get_last_played_card_if_visible()
    public_game_state["lastDeclaredCard"] = board.get_last_declared_card()
    public_game_state["isActualCardHidden"] = board.get_is_last_card_hidden()
    logging.debug(f"Public game state {public_game_state}")
    # TODO - add cards left in deck
    return public_game_state

def get_private_game_state(player_id:str):
    private_game_state = {}
    private_game_state["playerHand"] = _get_player_hand(player_id)
    private_game_state["isClientCurrentPlayer"] = True if turn_state.get_current_player_id() == player_id else False
    # TODO - add opponent cards left
    logging.debug(f"Private game state {private_game_state}")
    return private_game_state

def _get_player_hand(player_id:str):
    player = players_in_game.get_player_instance_by_id(player_id)
    return player.serialize_hand()

def _get_last_played_card_if_visible():
    return board.get_last_played_card_if_visible()

def _get_current_player_name():
    current_player_id = turn_state.get_current_player_id()
    return players_in_game.get_player_instance_by_id(current_player_id).name