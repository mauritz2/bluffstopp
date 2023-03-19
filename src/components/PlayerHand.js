import React, { useState } from "react";
import PlayerCard from "./PlayerCard";
import DeclareCard from "./DeclareCard";

function PlayerHand({cards, onPlay, lastDeclaredCard}){
    // TODO - do the CardClaimSelector need to be tested here or could it be run from App.js?
    const [showCardClaimMenu, setShowCardClaimMenu] = useState(false);
    const [cardActual, setCardActual] = useState({});

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
                <DeclareCard
                    cardActual={cardActual}
                    onPlay={hideBluffMenuAndPlayCard}
                    onCancel={hideClaimMenul}
                    lastDeclaredCard={lastDeclaredCard} /> : ""}
            <div id="playerHand">{card_list}</div>
        </>
    );
}

export default PlayerHand;
