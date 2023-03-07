# TODO - bring back this type, brought out due to circular import error - need __future__
#from game_api.player import Player

class PlayersInGame:
    
    def __init__(self):
       self.players = {}
    
    def add_player(self, player_id:str, player:"Player") -> None:
        self.players[player_id] = player
    
    def remove_player(self, player_id:str) -> None:
        del self.players[player_id]

    def get_player_names(self):
        return [player.name for player in self.players.values()]

    def get_player_instance_by_id(self, player_id:str):
        return self.players[player_id]