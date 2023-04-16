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

    def draw_card(self, num_cards:int=1) -> None:
        # TODO - rename draw_card to draw_cards
        for _ in range(num_cards):
            drawn_card = self.deck.draw_top_card()
            self.cards_on_hand[drawn_card.card_short] = drawn_card
 
    def play_card(self, card_actual:str) -> None:
        if card_actual not in list(self.cards_on_hand.keys()):
            raise KeyError(f"You tried {card_actual} which is not in the player's hand: {self.cards_on_hand.keys()}")
        card_to_play = self.cards_on_hand[card_actual]
        self.board.add_card_to_board(card_to_play)
        del self.cards_on_hand[card_actual]

    def serialize_hand(self) -> None:
        serialized_cards = []
        for card in self.cards_on_hand.values():
            serialized_card = {"suit":card.suit.value, "value":card.value}
            serialized_cards.append(serialized_card)
        return serialized_cards


