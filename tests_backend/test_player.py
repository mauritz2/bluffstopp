import pytest
from game_api.player import Player
from game_api.card import Card
from game_api.config import Suits
from game_api.deck import Deck
from game_api.board import Board

@pytest.fixture
def player():
    deck = Deck()
    board = Board()
    player = Player(id="111", name="Bob", deck=deck, board=board)
    player.cards_on_hand = {}
    return player

def test_draw_initial_hand(player):
    player._draw_initial_hand()
    assert len(player.cards_on_hand) == 7

def test_draw_card(player):
    old_hand_size = len(player.cards_on_hand)
    player.draw_card()
    assert len(player.cards_on_hand) == old_hand_size + 1

def test_draw_card_multiple_cards(player):
    old_hand_size = len(player.cards_on_hand)
    player.draw_card(num_cards=5)
    assert len(player.cards_on_hand) == old_hand_size + 5

def test_play_card(player):
    card_to_play = Card(suit=Suits.hearts, value="knight")
    player.cards_on_hand[card_to_play.card_short] = card_to_play 
    player.play_card("hearts knight")
    assert "hearts knight" not in player.cards_on_hand.keys()

def test_play_card_not_in_hand(player):
    with pytest.raises(KeyError):
        player.play_card("hearts knight")

def test_serialize_hand(player):
    player.cards_on_hand["spades king"] = Card(suit=Suits.spades, value="king")
    player.cards_on_hand["spades queen"] = Card(suit=Suits.spades, value="queen")
    serialized_hand = player.serialize_hand()
    assert serialized_hand == [{"suit":"spades", "value":"king"}, {"suit":"spades", "value":"queen"}]
