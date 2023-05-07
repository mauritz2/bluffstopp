import React, { useState, useEffect } from "react";
import spadesQueen from "../static/spades_queen.png" 
import Constants from "../Constants";

function PlayerCard({card, onPlay, showPlayBtn}) {

    const card_name = card.suit + " " + card.value
    
    return(
        <div className="card-contianer">
            <img className="card-img" src={Constants.CARD_IMAGES[card_name]} />
            {showPlayBtn === true ? <button className="btn play-card-btn" onClick={() => onPlay(card)}>Play card</button> : ""}
        </div>
        );
    }


export default PlayerCard
