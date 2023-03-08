

function CardClaimMenu({cardBeingPlayed, onCancel}){
    // Need to add prop for what card was clicked so we can pre-select the correct card
    // Add a state to show currently claim card to show currently played card
    let suitAndValueBeingPlayed = cardBeingPlayed.split(" ");
    let suitBeingPlayed = suitAndValueBeingPlayed[0]
    let valueBeingPlayed = suitAndValueBeingPlayed[1]

    console.log(suitBeingPlayed);

    function create_radio_btn_group(btn_values, group_name){
        let radio_btn_group = [];
        btn_values.forEach((value) => {
            radio_btn_group.push(
                <div className="radio-btn">
                    <input type="radio" id={value} value={value} name={group_name} checked={isDefaultValue(value) ? "checked" : ""} />
                    <label for={value}>{value}</label>
                </div>);
        });
        return radio_btn_group;
    }

    function isDefaultValue(radio_btn_value){
        if(radio_btn_value === suitBeingPlayed || radio_btn_value === valueBeingPlayed)
        {
            return true;
        }
        else{
            return false;
        }
    }
    
    const card_suits = ["diamonds", "spades", "clovers", "hearts"];
    const card_values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"];

    let suits_radio_btn_group = create_radio_btn_group(card_suits, "card_suits");
    let card_radio_btn_group = create_radio_btn_group(card_values, "card_values");

    return(
        <>
            <p>Would you like to play this card as <strong>{cardBeingPlayed}</strong>?</p>
            <form>
                <div className="radio-btn-group">
                    {suits_radio_btn_group}
                </div>
                <div className="radio-btn-group">
                    {card_radio_btn_group}
                </div>
                <input type="submit" value="Play card" />
                <input type="button" value="Cancel" onClick={() => onCancel()} />
            </form>
        </>
    );
}

export default CardClaimMenu;