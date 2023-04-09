import pytest
from game_api.turn_state import TurnState

@pytest.fixture
def turn_state():
    turn_state = TurnState()
    turn_state.add_player("Player 1")
    turn_state.add_player("Player 2")
    turn_state.add_player("Player 3")
    turn_state.add_player("Player 4")
    return turn_state

def test_get_player_ids(turn_state):
    assert turn_state.get_player_ids() == ["Player 1", "Player 2", "Player 3", "Player 4"]

def test_add_player(turn_state):
    turn_state.add_player("Alice")
    assert "Alice" in turn_state.get_player_ids()
    assert "Alice" in turn_state.player_with_turn_left_in_round

def test_add_duplicated_player(turn_state):
    turn_state.add_player("John Doe")
    with pytest.raises(ValueError):
        turn_state.add_player("John Doe")

def test_remove_player(turn_state):
    assert "Player 1" in turn_state.get_player_ids()
    turn_state.remove_player("Player 1")
    assert "Player 1" not in turn_state.get_player_ids()

def test_start_turn(turn_state):
    assert turn_state.get_current_player_id() == None
    turn_state.start_turn()
    assert turn_state.get_current_player_id() == "Player 1"


def test_end_current_player_turn(turn_state):
    turn_state.start_turn()
    assert turn_state.get_current_player_id() == "Player 1"
    old_len = len(turn_state.player_with_turn_left_in_round)
    turn_state.end_current_player_turn()
    assert turn_state.get_current_player_id() == "Player 2"
    assert len(turn_state.player_with_turn_left_in_round) == old_len - 1 

def test_end_current_player_turn_last_player(turn_state):
    turn_state.player_ids = ["Player X", "Player Y"]
    turn_state.player_with_turn_left_in_round = ["Player X", "Player Y"]
    old_len = len(turn_state.player_with_turn_left_in_round)
    turn_state.start_turn()
    turn_state.end_current_player_turn()
    turn_state.end_current_player_turn()
    assert len(turn_state.player_with_turn_left_in_round) == old_len
    assert turn_state.get_current_player_id() == "Player X" 

def test_get_new_player_order(turn_state):
    new_player_order = turn_state.get_new_player_order("Player 3")
    assert new_player_order == ["Player 3", "Player 4", "Player 1", "Player 2"]

def test_set_turn_order_invalid_player(turn_state):
    with pytest.raises(ValueError):
        turn_state.get_new_player_order("Invalid player name")

