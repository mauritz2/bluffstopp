import React, { useState, useEffect } from "react";

function PlayerCard({card, onPlay, showPlayBtn}) {

    return(
        <>
            {card}
            {showPlayBtn === true ? <button onClick={() => onPlay(card)}>Play card</button> : ""}
        </>
    );
}

export default PlayerCard
