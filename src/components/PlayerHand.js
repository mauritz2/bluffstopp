import React from "react";
import { JsxElement } from "typescript";
import PlayerCard from "./PlayerCard";

function PlayerHand({cards, onPlay}){

    let card_list = []
    cards.forEach((card) => {
        card_list.push(<li><PlayerCard card={card} onPlay={onPlay}/></li>);
    });
    
    return(
        <ul>{card_list}</ul>
    );
}

export default PlayerHand;
