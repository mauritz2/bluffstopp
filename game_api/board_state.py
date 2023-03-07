from game_api.app import players_in_game, turn_state, board


def get_public_board_state():
    public_board_state = {}
    public_board_state["lastPlayedCard"] = _get_last_played_card_if_visible()
    public_board_state["currentPlayerName"] = _get_current_player_name()
    return public_board_state

def get_private_board_state(player_id:str):
    private_board_state = {}
    private_board_state["playerHand"] = _get_player_hand(player_id)
    #private_board_state["isPlayerCurrentPlayer"] = True if turn_state.get_current_player_id() == player_id else False
    # TODO - add opponent cards left
    # TODO - add cards left in deck
    return private_board_state

def _get_player_hand(player_id:str):
    player = players_in_game.get_player_instance_by_id(player_id)
    return player.serialize_hand()

def _get_last_played_card_if_visible():
    return board.get_last_played_card_if_visible()

def _get_current_player_name():
    current_player_id = turn_state.get_current_player_id()
    return players_in_game.get_player_instance_by_id(current_player_id).name