import React, { useState, useEffect } from "react";
import spadesQueen from "../static/spades_queen.png" 


function PlayerCard({card, onPlay, showPlayBtn}) {

    return(
        <>
                <img src={spadesQueen} />
                {card.suit + " " + card.value}
                {showPlayBtn === true ? <button onClick={() => onPlay(card)}>Play card</button> : ""}
            </>
        );
    }


export default PlayerCard
