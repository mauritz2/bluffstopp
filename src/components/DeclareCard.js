import { useState, useEffect } from "react";
import {Flash} from "@primer/react";
import Constants from "../Constants";
import DeclareCardRadios from "./DeclareCardRadios";

function DeclareCard({cardActual, onPlay, onCancel, lastPlayedCardClaimed}){
    //const [suitClaimed, setSuitClaimed] = useState("");
    //const [valueClaimed, setValueClaimed] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [cardActualState, setCardActualState] = useState({});
    const [cardDeclaredState, setCardDeclaredState] = useState({});

    useEffect(() => {
        // TODO - don't have to re-define the obj here again most likely
        setCardActualState({"suit":cardActual.suit, "value":cardActual.value});
        setCardDeclaredState(cardActual);
    }, []);
    


    function setClaimedCardSuitAndValue(suitOrValue){
        if(Constants.CARD_SUITS.includes(suitOrValue)){
            setCardDeclaredState({...cardDeclaredState, suit: suitOrValue})
            }
        else if(Constants.CARD_VALUES.includes(suitOrValue)){
            setCardDeclaredState({...cardDeclaredState, value: suitOrValue})
        }
        else{
            throw new Error("The player is trying to claim to play " + suitOrValue + ", which is not a valid card suit or value")
        }
    }

    function splitSuitAndValue(suitAndValue){
        let [suit, value] = [undefined, undefined]
        if (!isFirstCardPlayed()){
            [suit, value] = suitAndValue.split(" ")
        }
        return [suit, value]
    }

    function isFirstCardPlayed(){
        if(lastPlayedCardClaimed == undefined || lastPlayedCardClaimed === null){
            return true
        }
        else{
            return false
        }
    }

    function onSubmit(event){
        event.preventDefault();
        let cardClaimedStr = cardDeclaredState.suit + " " + cardDeclaredState.value;
        let [lastCardSuitClaimed, lastCardValueClaimed] = splitSuitAndValue(lastPlayedCardClaimed);
        
        if (isFollowingSuitAndIncreasingValue(cardDeclaredState.suit, cardDeclaredState.value, lastCardSuitClaimed, lastCardValueClaimed)){
            onPlay(cardClaimedStr);
            setErrorMessage("")
        }
        else{
            triggerTimedErrorFlash(cardClaimedStr, lastPlayedCardClaimed);
        }
    }
    
    function isFollowingSuitAndIncreasingValue(suitClaimed, valueClaimed, lastCardSuitClaimed, lastCardValueClaimed){
        let isValid = false;
        if (lastCardSuitClaimed === undefined || lastCardValueClaimed === undefined){
            // These values are undefined when no card has been played previously
            // TODO --> Refactor to isFirstCardPlayed() or make that a state 
            isValid = true;
        }
        else if ((suitClaimed === lastCardSuitClaimed) && (Constants.CARD_VALUE_MAP[valueClaimed] > Constants.CARD_VALUE_MAP[lastCardValueClaimed])){
            isValid = true;
        }
        return isValid;
    }

    function triggerTimedErrorFlash(cardClaimed, lastPlayedCardClaimed){
        let errorMsg = "Playing " + cardClaimed + " is not a valid as a follow-up to " + lastPlayedCardClaimed + ". You have to play a card with a higher value in the same suit, or call the previous players bluff"
        setErrorMessage(errorMsg);
        setTimeout(() => {
            setErrorMessage("")}, 15000);
        }
        
    return(
        <>
            <p>Would you like to play this card as <strong>{cardDeclaredState.suit} {cardDeclaredState.value}</strong>?</p>
            <form onSubmit={(event) => onSubmit(event)}>
                <div className="radio-btn-group">
                    <DeclareCardRadios
                        btnValues={Constants.CARD_SUITS}
                        groupName={"cardSuits"}
                        setClaimedCardSuitAndValue={setClaimedCardSuitAndValue}
                        suitActual={cardActualState.suit}
                        valueActual={cardActualState.value} />
                </div>
                <div className="radio-btn-group">
                    <DeclareCardRadios
                            btnValues={Constants.CARD_VALUES}
                            groupName={"cardValues"}
                            setClaimedCardSuitAndValue={setClaimedCardSuitAndValue}
                            suitActual={cardActualState.suit}
                            valueActual={cardActualState.value} />
                </div>
                <input type="submit" value="Confirm" />
                {errorMessage.length > 0 ? <Flash variant="danger">{errorMessage}</Flash> : "" }
                <input type="button" value="Cancel" onClick={() => onCancel()} />
            </form>
        </>
    );
}

export default DeclareCard;