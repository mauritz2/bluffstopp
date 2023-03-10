import logging, sys
import enum

NUM_STARTING_CARDS = 7

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

logging.basicConfig(stream=sys.stderr, level=logging.DEBUG)
logger = logging.getLogger(__name__)

