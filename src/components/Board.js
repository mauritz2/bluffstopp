
function Board({lastActualCard, isActualCardHidden, lastDeclaredCard, isClientCurrentPlayer, didClientPlayLastCard, callBluff, passTurn}){

    let cardValueToDisplay = "";
    console.log(didClientPlayLastCard);
    if(isActualCardHidden){
        // TODO - currently "hidden" when no card has been played - fix
        cardValueToDisplay = "hidden";
    }
    else{
        cardValueToDisplay = lastActualCard;
    }
    return(
        <>
            <p>Declared: {lastDeclaredCard === null ? "No card played yet" : lastDeclaredCard?.suit + " " + lastDeclaredCard?.value}</p>
            <p>Actual: {cardValueToDisplay}</p>
            {(isActualCardHidden === true && didClientPlayLastCard === false) ? <button onClick={() => callBluff()}>Call bluff</button> : ""}
            {isClientCurrentPlayer === true ? <button onClick={() => passTurn()}>Pass</button> : ""}
        </>
    );
}

export default Board;