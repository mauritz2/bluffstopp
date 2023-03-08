import React from "react";
import { JsxElement } from "typescript";
import PlayerCard from "./PlayerCard";

function PlayerHand({cards, onPlay}){

    let card_list = []
    cards.forEach((card) => {
        card_list.push(<div><PlayerCard card={card} onPlay={onPlay}/></div>);
    });
    
    return(
        <div id="playerHand">{card_list}</div>
    );
}

export default PlayerHand;
