from game_api.game_components import players_in_game, turn_state, board, deck

def get_board_state_for_player(player_id:str):
    board_state = {}
    board_state["playerHand"] = _get_player_hand(player_id)
    board_state["lastPlayedCard"] = _get_last_played_card_if_visible()
    board_state["currentPlayerName"] = _get_current_player_name()
    board_state["isPlayerCurrentPlayer"] = True if turn_state.current_player_id == player_id else False
    # TODO - add opponent cards left
    # TODO - add cards left in deck
    return board_state

def _get_player_hand(player_id:str):
    player = players_in_game.get_player_instance_by_id(player_id)
    return player.serialize_hand()

def _get_last_played_card_if_visible():
    return board.get_last_played_card_if_visible()

def _get_current_player_name():
    current_player_id = turn_state.current_player_id
    return players_in_game.get_player_instance_by_id(current_player_id).name