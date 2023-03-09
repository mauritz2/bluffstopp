import React, { useState } from "react";
import PlayerCard from "./PlayerCard";
import CardClaimSelector from "./CardClaimMenu";

function PlayerHand({cards, onPlay, lastPlayedCardClaimed}){
    // TODO - do the CardClaimSelector need to be tested here or could it be run from App.js?
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
                <CardClaimSelector
                    cardActual={cardActual}
                    onPlay={hideBluffMenuAndPlayCard}
                    onCancel={hideClaimMenul}
                    lastPlayedCardClaimed={lastPlayedCardClaimed} /> : ""}
            <div id="playerHand">{card_list}</div>
        </>
    );
}

export default PlayerHand;
