import React, { useState } from "react";
import PlayerCard from "./PlayerCard";
import CardClaimMenu from "./CardClaimMenu";

function PlayerHand({cards, onPlay, lastPlayedCardClaimed}){

    const [showCardClaimMenu, setShowCardClaimMenu] = useState(false);
    const [cardActual, setCardActual] = useState("");

    function setCardToBePlayedAndShowClaimMenu(cardBeingPlayed){
        setCardActual(cardBeingPlayed);
        setShowCardClaimMenu(true);
    }

    function hideClaimMenul(){
        setShowCardClaimMenu(false);
    }

    let card_list = []
    cards.forEach((card) => {
        card_list.push(<div><PlayerCard card={card} onPlay={setCardToBePlayedAndShowClaimMenu} showPlayBtn={!(showCardClaimMenu)} /></div>);
    });

    function hideBluffMenuAndPlayCard(cardClaimed){
        setShowCardClaimMenu(false);
        onPlay(cardActual, cardClaimed);
    }
    
    return(
        <>
            {showCardClaimMenu === true ?
                <CardClaimMenu
                    cardActual={cardActual}
                    onPlay={hideBluffMenuAndPlayCard}
                    onCancel={hideClaimMenul}
                    lastPlayedCardClaimed={lastPlayedCardClaimed} /> : ""}
            <div id="playerHand">{card_list}</div>
        </>
    );
}

export default PlayerHand;
