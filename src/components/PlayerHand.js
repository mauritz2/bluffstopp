import React, { useState } from "react";
import PlayerCard from "./PlayerCard";
import CardClaimMenu from "./CardClaimMenu";

function PlayerHand({cards, onPlay}){

    const [showCardClaimMenu, setShowCardClaimMenu] = useState(false);
    const [cardBeingPlayed, setCardBeingPlayed] = useState("");

    function setCardToBePlayedAndShowClaimMenu(cardBeingPlayed){
        setCardBeingPlayed(cardBeingPlayed);
        setShowCardClaimMenu(true);
    }

    function hideClaimMenul(){
        setShowCardClaimMenu(false);
    }

    let card_list = []
    cards.forEach((card) => {
        card_list.push(<div><PlayerCard card={card} onPlay={setCardToBePlayedAndShowClaimMenu}/></div>);
    });
    
    return(
        <>
            {showCardClaimMenu === true ? <CardClaimMenu cardBeingPlayed={cardBeingPlayed} onPlay={onPlay} onCancel={hideClaimMenul} /> : ""}
            <div id="playerHand">{card_list}</div>
        </>
    );
}

export default PlayerHand;
