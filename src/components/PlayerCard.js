import React, { useState, useEffect } from "react";
import spadesQueen from "../static/spades_queen.png" 
import Constants from "../Constants";

function PlayerCard({card, onPlay, showPlayBtn}) {

    return(
        <>
                <img src={Constants.CARD_IMAGES["hearts queen"]} />
                {card.suit + " " + card.value}
                {showPlayBtn === true ? <button onClick={() => onPlay(card)}>Play card</button> : ""}
            </>
        );
    }


export default PlayerCard
