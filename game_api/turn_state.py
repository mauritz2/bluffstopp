
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

    def get_player_ids(self) -> list[str]:
        # TODO - remove this one and just reference player_ids
        return self.player_ids

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
            self.reset_player_turns()
        self.start_turn()
    
    def reset_player_turns(self, first_player=None) -> None:
        self.player_with_turn_left_in_round = self.get_player_order(first_player=first_player)
    
    def get_current_player_id(self):
        return self.current_player_id
    
    def get_player_order(self, first_player:str = None) -> list[str]:
        if first_player == None:
            # TODO - This is the scenario where the round simply continues - no resolution yet
            # When the round has ended the first player is alwasy (1) player that successfully called bluff, or (2) last player
            # that did not pass, or (3) player was the target of a bluff call, but the card was accurate
            # For the bluff scenarios, app.py needs to manually be able to call "reset_player_turns()"
            # with the new player turn
            # For the last one passing we can track the last person that played a valid card here
            return self.player_ids.copy()        
        elif first_player not in self.get_player_ids():
            raise ValueError(f"Cannot set first player to {first_player} - not in vaild list of players {self.get_player_ids()} ")
        new_player_order = []
        player_ids = self.player_ids
        first_player_index = player_ids.index(first_player)
        new_player_order = player_ids[first_player_index:] + player_ids[:first_player_index]
        return new_player_order