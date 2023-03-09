import pytest
from game_api.turn_state import TurnState
#from game_api.game_logic.turn_state import TurnState

@pytest.fixture
def turn_state():
    return TurnState(player_ids=["123", "456", "789", "111", "999"])

def test_starting_player(turn_state):
    assert turn_state.current_player_id == "123"

def test_end_current_player_turn(turn_state):
    old_len = len(turn_state.player_with_turn_left_in_round)
    turn_state.end_current_player_turn()
    assert turn_state.current_player_id == "456"
    assert len(turn_state.player_with_turn_left_in_round) == old_len - 1 

def test_end_round(turn_state):
    turn_state.player_with_turn_left_in_round = ["123"]
    turn_state.end_current_player_turn()
    assert turn_state.current_player_id == "123"
    assert len(turn_state.player_with_turn_left_in_round) == len(turn_state.player_ids) 
