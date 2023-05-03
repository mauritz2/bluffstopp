import React, { useState, useEffect } from "react";
import spadesQueen from "../static/spades_queen.png" 
import Constants from "../Constants";

function PlayerCard({card, onPlay, showPlayBtn}) {

    const card_name = card.suit + " " + card.value
    
    return(
        <>
                <img className="card-img" src={Constants.CARD_IMAGES[card_name]} />
                {card_name}
                {showPlayBtn === true ? <button onClick={() => onPlay(card)}>Play card</button> : ""}
            </>
        );
    }


export default PlayerCard
