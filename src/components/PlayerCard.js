import React, { useState, useEffect } from "react";

function PlayerCard({card, onPlay}) {

    const [cardVal, setCardVal] = useState("")

    useEffect(() => {
        setCardVal(card);
    }, [])

    return(
        <>
            {card}
            <button onClick={() => onPlay(cardVal)}></button>
        </>
    );
}

export default PlayerCard
