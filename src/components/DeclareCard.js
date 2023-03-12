import { useState, useEffect } from "react";
import {Flash} from "@primer/react";
import Constants from "../Constants";

function CardClaimSelector({cardActual, onPlay, onCancel, lastPlayedCardClaimed}){
    const [suitClaimed, setSuitClaimed] = useState("");
    const [valueClaimed, setValueClaimed] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [suitActual, valueActual] = splitSuitAndValue(cardActual);
    const cardValues = (Object.keys(Constants.CARD_VALUE_MAP)); 
    const cardSuits = Constants.SUITS;
    const suitsRadioBtnGroup = createRadioBtnGroup(Constants.SUITS, "cardSuits");
    const cardRadioBtnGroup = createRadioBtnGroup(cardValues, "cardValues");

    useEffect(() => {
        setClaimedCardSuitAndValue(suitActual);
        setClaimedCardSuitAndValue(valueActual);
    }, []);
    
    function createRadioBtnGroup(btnValues, groupName){
        let radioBtnGroup = [];
        btnValues.forEach((value) => {
            radioBtnGroup.push(
                <div className="radio-btn">
                    <input
                        type="radio"
                        id={value}
                        value={value}
                        name={groupName}
                        defaultChecked={isDefaultValue(value)}
                        onChange={() => setClaimedCardSuitAndValue(value)}/>
                    <label htmlFor={value}>{value}</label>
                </div>);
        });
        return radioBtnGroup;
    }

    function isDefaultValue(radioBtnValue){
        if(radioBtnValue === suitActual || radioBtnValue === valueActual)
        {
            return true;
        }
        else{
            return false;
        }
    }
    
    function setClaimedCardSuitAndValue(suitOrValue){
        if(cardSuits.includes(suitOrValue)){
            setSuitClaimed(suitOrValue);
        }
        else if(cardValues.includes(suitOrValue)){
            setValueClaimed(suitOrValue);
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
        let cardClaimed = suitClaimed + " " + valueClaimed;
        let [lastCardSuitClaimed, lastCardValueClaimed] = splitSuitAndValue(lastPlayedCardClaimed);
        
        if (isFollowingSuitAndIncreasingValue(suitClaimed, valueClaimed, lastCardSuitClaimed, lastCardValueClaimed)){
            onPlay(cardClaimed);
            setErrorMessage("")
        }
        else{
            triggerTimedErrorFlash(cardClaimed, lastPlayedCardClaimed);
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
        //setTimeout(() => {
        //    setErrorMessage("")}, 15000);
        }
    
    return(
        <>
            <p>Would you like to play this card as <strong>{suitClaimed} {valueClaimed}</strong>?</p>
            <form onSubmit={(event) => onSubmit(event)}>
                <div className="radio-btn-group">
                    {suitsRadioBtnGroup}
                </div>
                <div className="radio-btn-group">
                    {cardRadioBtnGroup}
                </div>
                <input type="submit" value="Confirm" />
                {errorMessage.length > 0 ? <Flash variant="danger">{errorMessage}</Flash> : "" }
                <input type="button" value="Cancel" onClick={() => onCancel()} />
            </form>
        </>
    );
}

export default CardClaimSelector;