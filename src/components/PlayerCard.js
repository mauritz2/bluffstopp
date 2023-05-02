import React, { useState, useEffect } from "react";
import spadesQueen from "../static/spades_queen.png" 
import { cardImgs } from "../lib/img-importer";
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
