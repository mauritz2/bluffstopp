import Constants from "../Constants";

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
            <p>Declared: {lastDeclaredCard === null ? "No card played yet" : <img className="card-img" src={Constants.CARD_IMAGES[lastDeclaredCard?.suit + " " + lastDeclaredCard?.value]}/> }</p>
            <p>Actual: {cardValueToDisplay}</p>
            {isPossibleToCallBluff() ? <button className="btn" onClick={() => callBluff()}>Call bluff</button> : ""}
            {isPossibleToPass() ? <button className="btn" onClick={() => passTurn()}>Pass</button> : ""}
        </>
    );
}

export default Board;