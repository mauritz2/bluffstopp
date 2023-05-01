from random import shuffle

from game_api.config import Suits, card_values
from game_api.card import Card

class Deck:
    # TODO - add re-shuffling of deck when deck is empty
    def __init__(self):
        self.cards = self._create_deck()

        self.shuffle()

    def _create_deck(self):
        cards = []
        for suit in Suits:
            for card_value in card_values.keys():
                card = Card(suit=suit, value=card_value)
                cards.append(card)
        return cards

    def draw_top_card(self):
        if len(self.cards) <= 0:
            raise ValueError("Trying to draw from empty deck")
        return self.cards.pop()
    
    def shuffle(self):
        shuffle(self.cards)
