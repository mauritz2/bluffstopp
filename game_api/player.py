#from game_api.game_components import deck
#from game_api.game_components import board
from game_api.config import NUM_STARTING_CARDS

class Player:
    def __init__(self, id:int, name:str, deck:"Deck", board:"Board"):
        self.id = id
        self.name = name
        self.cards_on_hand = {}
        self.deck = deck
        self.board = board

        self._draw_initial_hand()
    
    def _draw_initial_hand(self) -> None:
        for _ in range(NUM_STARTING_CARDS):
            self.draw_card()

    def draw_card(self) -> None:
        drawn_card = self.deck.draw_top_card()
        self.cards_on_hand[drawn_card.card_short] = drawn_card
 
    def play_card(self, card_str:str) -> None:

        print(f"\n\nTrying to play card {card_str}")
        if card_str not in list(self.cards_on_hand.keys()):
            raise KeyError(f"You tried {card_str} which is not in the player's hand: {self.cards_on_hand.keys()}")

        print(f"Passed check")
        card_to_play = self.cards_on_hand[card_str]
        self.board.add_card_to_board(card_to_play)
        print(f"Added to board")
        del self.cards_on_hand[card_str]
        print(f"Deleted")

    def serialize_hand(self) -> None:
        return list(self.cards_on_hand.keys())


