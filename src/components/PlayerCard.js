import React, { useState, useEffect } from "react";

function PlayerCard({card, onPlay}) {

    return(
        <>
            {card}
            <button onClick={() => onPlay(card)}></button>
        </>
    );
}

export default PlayerCard
