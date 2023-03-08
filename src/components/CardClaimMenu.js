

function CardClaimMenu(){
    function create_radio_btn_group(btn_values, group_name){
        let radio_btn_group = [];
        btn_values.forEach((value) => {
            radio_btn_group.push(
                <div className="radio-btn">
                    <input type="radio" id={value} value={value} name={group_name} />
                    <label for={value}>{value}</label>
                </div>);
        });
        return radio_btn_group;
    }
    
    const card_suits = ["diamond", "spade", "clover", "heart"];
    const card_values = ["two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king", "ace"];

    let suits_radio_btn_group = create_radio_btn_group(card_suits, "card_suits");
    let card_radio_btn_group = create_radio_btn_group(card_values, "card_values");

    return(
        <>
            <h3>What card do you want to claim that you're playing?</h3>
            <form>
                <div className="radio-btn-group">
                    {suits_radio_btn_group}
                </div>
                <div className="radio-btn-group">
                    {card_radio_btn_group}
                </div>
            </form>
        </>
    );
}

export default CardClaimMenu;