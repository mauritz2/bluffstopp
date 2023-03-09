import { useState, useEffect } from "react";

function CardClaimMenu({cardBeingPlayed, onPlay, onCancel}){
    // Need to add prop for what card was clicked so we can pre-select the correct card
    // Add a state to show currently claim card to show currently played card
    //const [claimedCard, setClaimedCard] = useState("");
    const [claimedSuit, setClaimedSuit] = useState("");
    const [claimedValue, setClaimedValue] = useState("");

    let suitAndValueBeingPlayed = cardBeingPlayed.split(" ");
    let suitBeingPlayed = suitAndValueBeingPlayed[0];
    let valueBeingPlayed = suitAndValueBeingPlayed[1];
    
    useEffect(() => {
        setClaimedCardSuitAndValue(suitBeingPlayed);
        setClaimedCardSuitAndValue(valueBeingPlayed);
    }, []);
    
    const cardSuits = ["diamonds", "spades", "clovers", "hearts"];        
    const cardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"];

    // TODO - should these be set as state? They should never update after initial render though
    let suitsRadioBtnGroup = createRadioBtnGroup(cardSuits, "cardSuits");
    let cardRadioBtnGroup = createRadioBtnGroup(cardValues, "cardValues");
    
    function setClaimedCardSuitAndValue(suitOrValue){
        if(cardSuits.includes(suitOrValue)){
            setClaimedSuit(suitOrValue);
        }
        else if(cardValues.includes(suitOrValue)){
            setClaimedValue(suitOrValue);
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
                    <label for={value}>{value}</label>
                </div>);
        });
        return radioBtnGroup;
    }

    function isDefaultValue(radioBtnValue){
        // TODO - poor practice to reference global vars here - add in as params?
        if(radioBtnValue === suitBeingPlayed || radioBtnValue === valueBeingPlayed)
        {
            return true;
        }
        else{
            return false;
        }
    }

    function onSubmit(){
        let cardToPlay = claimedSuit + " " + claimedValue;
        onPlay(cardToPlay);
    }
    
    return(
        <>
            <p>Would you like to play this card as <strong>{claimedSuit} {claimedValue}</strong>?</p>
            <form onSubmit={() => onSubmit()}>
                <div className="radio-btn-group">
                    {suitsRadioBtnGroup}
                </div>
                <div className="radio-btn-group">
                    {cardRadioBtnGroup}
                </div>
                <input type="submit" value="Confirm" />
                <input type="button" value="Cancel" onClick={() => onCancel()} />
            </form>
        </>
    );
}

export default CardClaimMenu;