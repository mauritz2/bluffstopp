import React, { useState } from "react";
import PlayerCard from "./PlayerCard";
import CardClaimMenu from "./CardClaimMenu";

function PlayerHand({cards, onPlay}){

    const [showCardClaimMenu, setShowCardClaimMenu] = useState(false);

    function showClaimMenu(){
        setShowCardClaimMenu(true);
    }

    let card_list = []
    cards.forEach((card) => {
        card_list.push(<div><PlayerCard card={card} onPlay={showClaimMenu}/></div>);
    });
    
    return(
        <>
            {showCardClaimMenu == true ? <CardClaimMenu /> : ""}
            <div id="playerHand">{card_list}</div>
        </>
    );
}

export default PlayerHand;
