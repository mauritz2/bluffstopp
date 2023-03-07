from dataclasses import dataclass
from typing import Union
from game_api.config import Suits

@dataclass
class Card:
    suit: Suits
    value: str

    def __post_init__(self):
       self.card_short = f"{self.suit.value} {self.value}"