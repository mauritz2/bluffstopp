from typing import Union

from game_api.card import Card

class Board:
    def __init__(self):
        self.last_played_card_actual = None
        self.last_played_card_claimed = None
        self.is_last_card_hidden = True
    
    def add_card_to_board(self, card:Card) -> None:
        self.last_played_card_actual = card
        self.is_last_card_hidden = True

    def get_last_played_card_if_visible(self) -> Union[str, bool, None]:
        if self.is_last_card_hidden or self.last_played_card_actual == None:
            return False
        return self.last_played_card_actual.card_short

    def get_is_last_card_hidden(self) -> bool:
        return self.is_last_card_hidden

    def show_card(self) -> None:
        self.is_last_card_hidden = False

    def set_claim_for_last_played_card(self, card_str:str) -> None:
        # TODO - should we validate here whether the card_str is valid?
        self.last_played_card_claimed = card_str

    def get_claim_for_last_played_card(self) -> str:
        return self.last_played_card_claimed