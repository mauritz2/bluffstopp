import { useState, useEffect } from "react";
import {Flash} from "@primer/react";
import Constants from "../Constants";
import DeclareCardRadios from "./DeclareCardRadios";

function DeclareCard({cardActual, onPlay, onCancel, lastDeclaredCard}){
    const [errorMessage, setErrorMessage] = useState("");
    const [cardDeclared, setCardDeclared] = useState({});

    useEffect(() => {
        setCardDeclared(cardActual);
    }, []);
    
    function setDeclaredCard(suitOrValue){
        if(Constants.CARD_SUITS.includes(suitOrValue)){
            setCardDeclared({...cardDeclared, suit: suitOrValue})
            }
        else if(Constants.CARD_VALUES.includes(suitOrValue)){
            setCardDeclared({...cardDeclared, value: suitOrValue})
        }
        else{
            throw new Error("The player is trying to claim to play " + suitOrValue + ", which is not a valid card suit or value")
        }
    }

    function onSubmit(event){
        event.preventDefault();
        // Refactor so cardDeclared is an obj
        let cardClaimedStr = cardDeclared.suit + " " + cardDeclared.value;
        
        if (isFollowingSuitAndIncreasingValue(cardDeclared.suit, cardDeclared.value)){
            onPlay(cardClaimedStr);
            setErrorMessage("")
        }
        else{
            triggerTimedErrorFlash(cardClaimedStr, lastDeclaredCard);
        }
    }
    
    function isFollowingSuitAndIncreasingValue(suitClaimed, valueClaimed){
        let isValid = false;
        if (isFirstCardPlayed() || isFollowingSuit(suitClaimed) && isIncreasingValue(valueClaimed)){
            isValid = true;
        }
        return isValid;
    }

    function isFirstCardPlayed(){
        return (lastDeclaredCard === undefined ? true : false);
    }

    function isFollowingSuit(suitClaimed){
        return (suitClaimed == lastDeclaredCard.suit ? true : false);
    }

    function isIncreasingValue(valueClaimed){
        return (Constants.CARD_VALUE_MAP[valueClaimed] > Constants.CARD_VALUE_MAP[lastDeclaredCard.value] ? true : false);
    }

    function triggerTimedErrorFlash(cardClaimed, lastDeclaredCard){
        let errorMsg = "Playing " + cardClaimed + " is not a valid as a follow-up to " + lastDeclaredCard.suit + " " + lastDeclaredCard.value +  ". You have to play a card with a higher value in the same suit, or call the previous players bluff"
        setErrorMessage(errorMsg);
        setTimeout(() => {
            setErrorMessage("")}, 15000);
        }

    return(
        <>
            <p>Would you like to play this card as <strong>{cardDeclared.suit} {cardDeclared.value}</strong>?</p>
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