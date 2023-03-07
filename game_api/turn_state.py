import copy

class TurnState:
    
    def __init__(self, player_ids:list[str]):
        self.player_ids = player_ids 
        self.current_player_id = self.player_ids[0]
        self.player_with_turn_left_in_round = self.player_ids.copy()
    
    def end_current_player_turn(self):
        self.player_with_turn_left_in_round.remove(self.current_player_id)
        if len(self.player_with_turn_left_in_round) == 0:
            self.end_round()
        self.current_player_id = self.player_with_turn_left_in_round[0]
    
    def end_round(self):
        self.player_with_turn_left_in_round = self.player_ids.copy()
        