import logging, sys
import enum

NUM_STARTING_CARDS = 7
NUM_PUNISHMENT_CARDS_TO_DRAW = 3

# TODO - rename clovers to clubs
# TODO - Change naming standard to "9 spades" "king spades" etc.

class Suits(enum.Enum):
    hearts = "hearts"
    spades = "spades"
    diamonds = "diamonds"
    clovers = "clovers"

card_values = {
    "2":2,
    "3":3,
    "4":4,
    "5":5,
    "6":6,
    "7":7,
    "8":8,
    "9":9,
    "10":10,
    "jack":11,
    "queen":12,
    "king":13,
    "ace":14,
}

logging.basicConfig(stream=sys.stderr, level=logging.WARNING)
logger = logging.getLogger(__name__)