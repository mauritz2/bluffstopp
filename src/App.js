import React, { useState, useEffect} from 'react';
import './App.css';
import { io } from "socket.io-client";
import * as Cookies from "./lib/cookies";
import PlayerHand from "./components/PlayerHand"
import LastPlayedCard from './components/LastPlayedCard';

function App() {

  Cookies.createUUIDandSetInCookieIfDoesNotExist();
  const player_id = Cookies.getUUIDFromCookie();

  const [socketInstance, setSocketInstance] = useState("");
  const [players, setPlayers] = useState([]);
  const [hand, setHand] = useState([]);
  const [currentPlayerName, setCurrentPlayerName] = useState("");
  const [lastPlayedCardActual, setLastPlayedCardActual] = useState("");
  const [isLastCardHidden, setIsLastCardHidden] = useState(true);
  const [lastPlayedCardClaimed, setLastPlayedCardClaimed] = useState("");

  useEffect(() => {

    const socket = io("ws://127.0.0.1:5000/", {
      transports: ["websocket"]
    });

    setSocketInstance(socket);
    
    socket.on("UPDATE PLAYERS", (playerNames) => {
      setPlayers(playerNames);
    });

    socket.on("UPDATE PUBLIC GAME STATE", (publicGameState) => {
      setLastPlayedCardActual(publicGameState["lastPlayedCardActual"]);
      setLastPlayedCardClaimed(publicGameState["lastPlayedCardClaimed"]);
      setCurrentPlayerName(publicGameState["currentPlayerName"]);
      setIsLastCardHidden(publicGameState["isLastCardHidden"]);
    });

    socket.on("REQUEST PRIVATE GAME STATE", () => {
      socket.emit("GET PRIVATE GAME STATE", player_id)
    })

    socket.on("UPDATE PRIVATE GAME STATE", (privateGameState) => {
      setHand(privateGameState["playerHand"]);
    });
  }, []);

  function addPlayer(){
    // TODO - update with actual player names instead of player_id
    socketInstance.emit("ADD PLAYER", player_id, player_id);
  }
  
  function startGame(){
    socketInstance.emit("START GAME");
    socketInstance.emit("GET PRIVATE GAME STATE", player_id);
  }
  
  function playCard(cardActual, cardClaimed){
    socketInstance.emit("PLAY CARD", player_id, cardActual, cardClaimed);
  }
  
  function refreshGameState(){
    socketInstance.emit("GET PUBLIC GAME STATE");
    socketInstance.emit("GET PRIVATE GAME STATE", player_id);
  }

  function callBluff(){
    socketInstance.emit("CALL BLUFF", player_id);
  }

  return (
    <div className="App">
        <h1>Bluffstopp</h1>
        <button onClick={() => addPlayer()}>Add players</button>
        <button onClick={() => startGame()}>Start game</button>
        <button onClick={() => refreshGameState()}>Refresh game state</button>
        <p>Players in the game: {players}</p>
        <p>Current player: {currentPlayerName}</p>
        <LastPlayedCard
              lastPlayedCardActual={lastPlayedCardActual}
              isLastCardHidden={isLastCardHidden}
              lastPlayedCardClaimed={lastPlayedCardClaimed}
              callBluff={callBluff}/>
        <PlayerHand cards={hand} onPlay={playCard}/>
    </div>
  );
}

export default App;
