from typing import Union

from game_api.card import Card

class Board:
    def __init__(self):
        self.last_played_card = None
        # TODO - change back to True when bluffing is introduced
        self.is_last_card_hidden = False
    
    def add_card_to_board(self, card:Card) -> None:
        self.last_played_card = card
        # TODO - change back to True when bluffing is introduced
        self.is_last_card_hidden = False

    def get_last_played_card_if_visible(self) -> Union[str, bool, None]:
        # TODO - the return types here vary quite a bit - better to just return a str for each case?
        if self.is_last_card_hidden:
            return False
        if self.last_played_card == None:
            return None
        return self.last_played_card.card_short