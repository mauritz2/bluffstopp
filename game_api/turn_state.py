
class TurnState:
    # TODO - revisit this class - it gets more complicated than necessary
    # because it can be instantiated without player_ids
    # couldn't find a better way to do it, but there must be a way
    # if possible to instantiate with player_ids we can remove add and remove player methods
    # blocker is being able to reference the updated instance of turn_state once updated with player_ids

    def __init__(self):
        self.player_ids = []
        self.current_player_id = None
        self.player_with_turn_left_in_round = None

    def add_player(self, player_id:str) -> None:
        if player_id in self.player_ids:
            raise ValueError("Adding player with already existing ID")
        self.player_ids.append(player_id)
        self.player_with_turn_left_in_round = self.player_ids.copy()
    
    def remove_player(self, player_id:str) -> None:
        self.player_ids.remove(player_id)
    
    def start_turn(self):
        self.current_player_id = self.player_with_turn_left_in_round[0]
    
    def end_current_player_turn(self):
        self.player_with_turn_left_in_round.remove(self.current_player_id)
        if len(self.player_with_turn_left_in_round) == 0:
            self.end_round()
        self.start_turn()
    
    def end_round(self):
        self.player_with_turn_left_in_round = self.player_ids.copy()
    
    def get_current_player_id(self):
        return self.current_player_id
