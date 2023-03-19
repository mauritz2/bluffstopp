import React, { useState, useEffect} from 'react';
import './App.css';
import { io } from "socket.io-client";
import * as Cookies from "./lib/cookies";
import PlayerHand from "./components/PlayerHand"
import Board from './components/Board';
import {ThemeProvider} from '@primer/react'

function App() {

  Cookies.createUUIDandSetInCookieIfDoesNotExist();
  const player_id = Cookies.getUUIDFromCookie();

  const [socketInstance, setSocketInstance] = useState("");
  const [players, setPlayers] = useState([]);
  const [hand, setHand] = useState([]);
  const [currentPlayerName, setCurrentPlayerName] = useState("");
  const [lastActualCard, setLastActualCard] = useState("");
  const [isActualCardHidden, setIsActualCardHidden] = useState(true);
  const [lastDeclaredCard, setLastDeclaredCard] = useState({});

  useEffect(() => {

    const socket = io("ws://127.0.0.1:5000/", {
      transports: ["websocket"]
    });

    setSocketInstance(socket);
    
    socket.on("UPDATE PLAYERS", (playerNames) => {
      setPlayers(playerNames);
    });

    socket.on("UPDATE PUBLIC GAME STATE", (publicGameState) => {
      setLastActualCard(publicGameState["lastActualCard"]);
      setLastDeclaredCard(publicGameState["lastDeclaredCard"]);
      setCurrentPlayerName(publicGameState["currentPlayerName"]);
      setIsActualCardHidden(publicGameState["isActualCardHidden"]);
    });

    socket.on("REQUEST PRIVATE GAME STATE", () => {
      socket.emit("GET PRIVATE GAME STATE", player_id)
    });

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
  
  function playCard(cardActual, cardDelared){
    let cardStr = cardActual.suit + " " + cardActual.value;
    socketInstance.emit("PLAY CARD", player_id, cardStr, cardDelared);
  }
  
  function refreshGameState(){
    socketInstance.emit("GET PUBLIC GAME STATE");
    socketInstance.emit("GET PRIVATE GAME STATE", player_id);
  }

  function callBluff(){
    socketInstance.emit("CALL BLUFF", player_id);
  }

  return (
    <div>
        <ThemeProvider>
          <button onClick={() => addPlayer()}>Add players</button>
          <button onClick={() => startGame()}>Start game</button>
          <button onClick={() => refreshGameState()}>Refresh game state</button>
          <p>Players in the game: {players}</p>
          <p>Current player: {currentPlayerName}</p>
          <Board
                lastActualCard={lastActualCard}
                isActualCardHidden={isActualCardHidden}
                lastDeclaredCard={lastDeclaredCard}
                callBluff={callBluff}/>
          <PlayerHand
                cards={hand}
                onPlay={playCard}
                lastDeclaredCard={lastDeclaredCard}/>
    </ThemeProvider>
    </div>
  );
}

export default App;
