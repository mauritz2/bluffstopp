from game_api.turn_state import TurnState
from game_api.board import Board
from game_api.deck import Deck
from game_api.players_in_game import PlayersInGame

players_in_game = PlayersInGame()
turn_state = TurnState(["123"]) # TODO - take IDs from front-end cookies when implemented
board = Board()
deck = Deck()
# board_state = BoardState()
