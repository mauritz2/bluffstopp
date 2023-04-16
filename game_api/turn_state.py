
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
        self.player_who_played_last_card = None

    # Implenet @property for player_who_played_last_card

    def add_player(self, player_id:str) -> None:
        if player_id in self.player_ids:
            raise ValueError("Adding player with already existing ID")
        self.player_ids.append(player_id)
        self.player_with_turn_left_in_round = self.player_ids.copy()
    
    def remove_player(self, player_id:str) -> None:
        self.player_ids.remove(player_id)
    
    def start_next_turn(self):
        self.current_player_id = self.player_with_turn_left_in_round[0]
    
    def end_current_player_turn(self):
        # TODO - naming is a big confusing between start_next_turn
        # and end_current_player_turn - fix
        self.player_with_turn_left_in_round.remove(self.current_player_id)
        if len(self.player_with_turn_left_in_round) == 0:
            self.reset_player_turns()
        self.start_next_turn()
    
    def reset_player_turns(self, new_first_player=None) -> None:
        if new_first_player == None:
            self.player_with_turn_left_in_round = self.player_ids.copy()
        else:
            self.player_with_turn_left_in_round = self.get_new_player_order(new_first_player=new_first_player)    

    #def set_player_who_played_last_card(self, player_that_played_last_card:str):
    #    if self.is_invalid_player(player_that_played_last_card):
    #        raise ValueError(f"{player_that_played_last_card} is not a valid player in the game")    
    #    self.player_who_played_last_card = player_that_played_last_card

    def is_invalid_player(self, player_name):
        return True if player_name not in self.player_ids else False

    def did_all_players_pass(self):
        return True if self.player_who_played_last_card == self.current_player_id else False

    def get_new_player_order(self, new_first_player:str) -> list[str]:
        if self.is_invalid_player(new_first_player):
            raise ValueError(f"Cannot set first player to {new_first_player} - not in vaild list of players {self.player_ids} ")
        new_player_order = []
        player_ids = self.player_ids.copy()
        first_player_index = player_ids.index(new_first_player)
        new_player_order = player_ids[first_player_index:] + player_ids[:first_player_index]
        return new_player_order

        # Round simplify continues (no resolution)
            # Initiating event
                # PLAY CARD 
        # Round goes to falsely accused player / # Round goes to player who identified the bluff
            # Initiating event
                # CALL BLUFF
            # Reset the round starting with player X
        # Round goes to last player who didn't pass
            # Initiating event
                # PASS
            # Logic --> Check if new current player == last_played_card_player
            # If yes - reset the round