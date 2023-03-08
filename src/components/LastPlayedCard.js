import { useState, useEffect } from "react";

function LastPlayedCard({lastPlayedCard, isLastCardHidden, callBluff}){

    let cardValueToDisplay = "";
    if(isLastCardHidden){
        cardValueToDisplay = "hidden";
    }
    else{
        cardValueToDisplay = lastPlayedCard;
    }

    return(
        <>
            <h1>Last card played: {cardValueToDisplay}</h1>
            {isLastCardHidden === true ? <button onClick={() => callBluff()}>Call bluff</button> : ""}
        </>
    );
} 

export default LastPlayedCard;