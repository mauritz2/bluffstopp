
function LastPlayedCard({lastPlayedCardActual, isLastCardHidden, lastPlayedCardClaimed, callBluff}){

    let cardValueToDisplay = "";
    if(isLastCardHidden){
        // TODO - currently "hidden" when no card has been played - fix
        cardValueToDisplay = "hidden";
    }
    else{
        cardValueToDisplay = lastPlayedCardActual;
    }

    return(
        <>
            <p>Claimed: {lastPlayedCardClaimed}</p>
            <p>Actual: {cardValueToDisplay}</p>
            {isLastCardHidden === true ? <button onClick={() => callBluff()}>Call bluff</button> : ""}
        </>
    );
}

export default LastPlayedCard;