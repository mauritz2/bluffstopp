
function Board({lastActualCard, isActualCardHidden, lastDeclaredCard, isClientCurrentPlayer, didClientPlayLastCard, callBluff, passTurn}){

    let cardValueToDisplay = "";
    if(isActualCardHidden){
        // TODO - currently "hidden" when no card has been played - fix
        cardValueToDisplay = "hidden";
    }
    else{
        cardValueToDisplay = lastActualCard;
    }

    function isPossibleToCallBluff(){
        if(isActualCardHidden === true){
            if(didClientPlayLastCard === false){
                if(lastDeclaredCard != null){
                    return true
                }
            }
        }
        return false
    }

    function isPossibleToPass(){
        if(isClientCurrentPlayer === true && lastDeclaredCard != null){
            return true
        }
        else{
            return false
        }
    }

    return(
        <>
            <p>Declared: {lastDeclaredCard === null ? "No card played yet" : lastDeclaredCard?.suit + " " + lastDeclaredCard?.value}</p>
            <p>Actual: {cardValueToDisplay}</p>
            {isPossibleToCallBluff() ? <button onClick={() => callBluff()}>Call bluff</button> : ""}
            {isPossibleToPass() ? <button onClick={() => passTurn()}>Pass</button> : ""}
        </>
    );
}

export default Board;