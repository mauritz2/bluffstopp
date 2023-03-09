import { useState, useEffect } from "react";
import {Flash} from "@primer/react";
import Constants from "../Constants";

function CardClaimSelector({cardActual, onPlay, onCancel, lastPlayedCardClaimed}){
    // Write tests for this component
    // Should the radio button group be a seprate component?
    // intrdocuce a firstCardPlayed bool to make it more clear rules are different for the first card?
    // Add flashing error messages when playing invalid card
    // Make clear comparison for jack, queen, ace --> mapping here? 

    const [suitClaimed, setSuitClaimed] = useState("");
    const [valueClaimed, setValueClaimed] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    let [suitActual, valueActual] = splitSuitAndValue(cardActual);

    useEffect(() => {
        setClaimedCardSuitAndValue(suitActual);
        setClaimedCardSuitAndValue(valueActual);
    }, []);
    
    const cardSuits = ["diamonds", "spades", "clovers", "hearts"];        
    const cardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"];

    function splitSuitAndValue(suitAndValue){
        // Todo - remove check for both undefined and null
        if (suitAndValue === undefined || suitAndValue === null){
            var [suit, value] = [undefined, undefined]
        }
        else{
            var [suit, value] = suitAndValue.split(" ")
        }
        return [suit, value]
    }

    // TODO - should these be set as state? They should never update after initial render though
    let suitsRadioBtnGroup = createRadioBtnGroup(cardSuits, "cardSuits");
    let cardRadioBtnGroup = createRadioBtnGroup(cardValues, "cardValues");

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
        // TODO - poor practice to reference global vars here - add in as params?
        if(radioBtnValue === suitActual || radioBtnValue === valueActual)
        {
            return true;
        }
        else{
            return false;
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