
function LastPlayedCard({lastPlayedCardActual, isLastCardHidden, lastDeclaredCard, callBluff}){

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
            <p>Claimed: {lastDeclaredCard}</p>
            <p>Actual: {cardValueToDisplay}</p>
            {isLastCardHidden === true ? <button onClick={() => callBluff()}>Call bluff</button> : ""}
        </>
    );
}

export default LastPlayedCard;