import pytest
import pickle
from game_api.deck import Deck
from game_api.card import Card

@pytest.fixture
def deck():
    return Deck()

def test_create_deck(deck):
    assert len(deck.cards) == 52
    assert isinstance(deck.cards[0], Card)

def test_draw_top_card(deck):
    old_top_card = deck.cards[-1]
    drawn_card = deck.draw_top_card()
    assert drawn_card == old_top_card
    assert drawn_card != deck.cards[-1]

def test_draw_from_empty(deck):
    deck.cards = []
    with pytest.raises(ValueError):
        deck.draw_top_card()
    
def test_shuffle(deck):
    old_cards = pickle.dumps(deck.cards)
    deck.shuffle()
    assert old_cards != pickle.dumps(deck.cards)
