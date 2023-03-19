import { useState, useEffect } from "react";
import {Flash} from "@primer/react";
import Constants from "../Constants";
import DeclareCardRadios from "./DeclareCardRadios";

function DeclareCard({cardActual, onPlay, onCancel, lastDeclaredCard}){
    const [errorMessage, setErrorMessage] = useState("");
    const [cardDeclaredState, setCardDeclaredState] = useState({});

    useEffect(() => {
        setCardDeclaredState(cardActual);
    }, []);
    

    function setDeclaredCard(suitOrValue){
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
        if(lastDeclaredCard === undefined || lastDeclaredCard === null){
            return true
        }
        else{
            return false
        }
    }

    function onSubmit(event){
        event.preventDefault();
        let cardClaimedStr = cardDeclaredState.suit + " " + cardDeclaredState.value;
        //let [lastCardSuitClaimed, lastCardValueClaimed] = splitSuitAndValue(lastDeclaredCard);
        
        if (isFollowingSuitAndIncreasingValue(cardDeclaredState.suit, cardDeclaredState.value)){
            onPlay(cardClaimedStr);
            setErrorMessage("")
        }
        else{
            triggerTimedErrorFlash(cardClaimedStr, lastDeclaredCard);
        }
    }
    
    function isFollowingSuitAndIncreasingValue(suitClaimed, valueClaimed){
        let isValid = false;
        // Referencing global var here - OK?
        if (lastDeclaredCard === undefined || lastDeclaredCard === undefined){
            // These values are undefined when no card has been played previously
            // TODO --> Refactor to isFirstCardPlayed() or make that a state 
            isValid = true;
        }
        else if ((suitClaimed === lastDeclaredCard.suit) && (Constants.CARD_VALUE_MAP[valueClaimed] > Constants.CARD_VALUE_MAP[lastDeclaredCard.value])){
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
                        setDeclaredCard={setDeclaredCard}
                        cardActual={cardActual} />
                </div>
                <div className="radio-btn-group">
                    <DeclareCardRadios
                            btnValues={Constants.CARD_VALUES}
                            groupName={"cardValues"}
                            setDeclaredCard={setDeclaredCard}
                            cardActual={cardActual} />
                </div>
                <input type="submit" value="Confirm" />
                {errorMessage.length > 0 ? <Flash variant="danger">{errorMessage}</Flash> : "" }
                <input type="button" value="Cancel" onClick={() => onCancel()} />
            </form>
        </>
    );
}

export default DeclareCard;