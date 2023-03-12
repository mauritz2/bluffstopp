
function Board({lastActualCard, isActualCardHidden, lastDeclaredCard, callBluff}){

    let cardValueToDisplay = "";
    if(isActualCardHidden){
        // TODO - currently "hidden" when no card has been played - fix
        cardValueToDisplay = "hidden";
    }
    else{
        cardValueToDisplay = lastActualCard;
    }

    return(
        <>
            <p>Claimed: {lastDeclaredCard}</p>
            <p>Actual: {cardValueToDisplay}</p>
            {isActualCardHidden === true ? <button onClick={() => callBluff()}>Call bluff</button> : ""}
        </>
    );
}

export default Board;