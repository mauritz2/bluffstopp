import pytest

from game_api.board import Board
from game_api.card import Card
from game_api.config import Suits

@pytest.fixture
def board():
    return Board()

def test_add_card_to_board(board):
    card = Card(suit=Suits.diamonds, value="king")
    board.add_card_to_board(card)
    assert board.last_played_card_actual == card
    assert board.is_last_card_hidden == True

def test_get_last_played_card_if_visible_card_hidden(board):
    board.is_last_card_hidden = True
    last_played_card = board.get_last_played_card_if_visible()
    assert last_played_card == False

def test_get_last_played_card_if_visible_no_cards(board):
    board.last_played_card_actual = None
    last_played_card = board.get_last_played_card_if_visible()
    assert last_played_card == False

def test_get_last_played_card_if_visible_card_visible(board):
    card = Card(suit=Suits.diamonds, value="king")
    board.is_last_card_hidden = False
    board.last_played_card_actual = card
    last_played_card = board.get_last_played_card_if_visible()
    assert last_played_card == "diamonds king"

def test_get_is_last_card_hidden(board):
    card_visibility = board.is_last_card_hidden = True
    assert board.get_is_last_card_hidden() == card_visibility

def test_show_card(board):
    old_card_visibility = board.is_last_card_hidden
    board.show_card()
    assert board.is_last_card_hidden == (not old_card_visibility)

def test_set_last_declared_card(board):
    board.set_last_declared_card("diamonds king")
    assert board.last_declared_card == "diamonds king"

def test_get_last_declared_card(board):
    board.last_declared_card = "diamonds king"
    assert board.get_last_declared_card() == {"suit":"diamonds", "value":"king"}
