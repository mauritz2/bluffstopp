import { useState, useEffect } from "react";

function LastPlayedCard({lastPlayedCardActual, isLastCardHidden, lastPlayedCardClaimed, callBluff}){

    let cardValueToDisplay = "";
    if(isLastCardHidden){
        cardValueToDisplay = "hidden";
    }
    else{
        cardValueToDisplay = lastPlayedCardActual;
    }

    console.log(lastPlayedCardActual);

    return(
        <>
            <h3>Claimed: {lastPlayedCardClaimed}</h3>
            <h3>Actual: {cardValueToDisplay}</h3>
            {isLastCardHidden === true ? <button onClick={() => callBluff()}>Call bluff</button> : ""}
        </>
    );
} 

export default LastPlayedCard;