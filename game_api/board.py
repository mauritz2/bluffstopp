from typing import Union

from game_api.card import Card

class Board:
    def __init__(self):
        self.last_played_card = None
        self.is_last_card_hidden = True
    
    def add_card_to_board(self, card:Card) -> None:
        self.last_played_card = card
        self.is_last_card_hidden = True

    def get_last_played_card_if_visible(self) -> Union[str, bool, None]:
        if self.is_last_card_hidden:
            return "False"
        if self.last_played_card == None:
            return None
        return self.last_played_card.card_short
    
    def get_is_last_card_hidden(self):
        return self.is_last_card_hidden

    def show_card(self):
        self.is_last_card_hidden = False
