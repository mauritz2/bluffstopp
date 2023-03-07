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
    assert board.last_played_card == card
    assert board.is_last_card_hidden == True

def test_get_last_played_card_if_visible_card_hidden(board):
    board.is_last_card_hidden = True
    last_played_card = board.get_last_played_card_if_visible()
    assert last_played_card == False

def test_get_last_played_card_if_visible_card_visible(board):
    board.is_last_card_hidden = False
    board.last_played_card = "jack spades"
    last_played_card = board.get_last_played_card_if_visible()
    assert last_played_card == "jack spades"