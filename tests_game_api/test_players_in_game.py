import pytest
from game_api.players_in_game import PlayersInGame
#from ...game_logic.players_in_game import PlayersInGame
from game_api.player import Player
#from ..game_logic.player import Player
from game_api.deck import Deck
from game_api.board import Board

deck = Deck()
board = Board()

@pytest.fixture
def players_in_game():
    players_in_game = PlayersInGame()
    return players_in_game

@pytest.fixture
def john():
    player_1 = Player(id="111", name="John", deck=deck, board=board)
    return player_1

@pytest.fixture
def susan():
    player_2 = Player(id="222", name="Susan", deck=deck, board=board)
    return player_2

def test_add_player(players_in_game, john):
    players_in_game.add_player(player_id=john.id, player=john)
    assert players_in_game.players["111"] == john

def test_remove_player(players_in_game, john):
    players_in_game.add_player(player_id=john.id, player=john)
    players_in_game.remove_player(player_id="111")
    assert len(players_in_game.players) == 0

def test_get_player_names(players_in_game, john, susan):
    players_in_game.add_player(player_id=john.id, player=john)
    players_in_game.add_player(player_id=susan.id, player=susan)
    player_names = players_in_game.get_player_names()
    assert player_names == ["John", "Susan"]

def test_get_player_ids(players_in_game, john, susan):
    players_in_game.add_player(player_id=john.id, player=john)
    players_in_game.add_player(player_id=susan.id, player=susan)
    player_names = players_in_game.get_player_ids()
    assert player_names == ["111", "222"]

def test_get_player_instance_by_id(players_in_game, john):
    players_in_game.add_player(player_id=john.id, player=john)
    player_instance = players_in_game.get_player_instance_by_id(john.id)
    assert isinstance(player_instance, Player)
    assert player_instance.name == "John"