import React, { useState, useEffect} from 'react';
import './App.css';
import { io } from "socket.io-client";
import * as Cookies from "./lib/cookies";
import PlayerHand from "./components/PlayerHand"

function App() {

  Cookies.createUUIDandSetInCookieIfDoesNotExist();
  const player_id = Cookies.getUUIDFromCookie();
  console.log(player_id);

  const [socketInstance, setSocketInstance] = useState("");
  const [players, setPlayers] = useState([])
  const [hand, setHand] = useState([])
  const [lastPlayedCard, setLastPlayedCard] = useState("")
  const [currentPlayerName, setCurrentPlayerName] = useState("")


  useEffect(() => {

    const socket = io("127.0.0.1:5000/", {
      transports: ["websocket"]
    });

    setSocketInstance(socket);
    
    socket.on("UPDATE PLAYERS", (playerNames) => {
      setPlayers(playerNames);
    });

    socket.on("UPDATE BOARD STATE", (boardState) => {
      console.log("UPDATING THE BOARD STATE")
      setHand(boardState["playerHand"]);
      setLastPlayedCard(boardState["lastPlayedCard"]);
      setCurrentPlayerName(boardState["currentPlayerName"]);
    });
  }, []);

  function addPlayer(){
    // TODO - update with actual player names
    socketInstance.emit("ADD PLAYER", player_id, player_id);
  }
  
  function startGame(){
    socketInstance.emit("START GAME");
  }
  
  function playCard(card_to_play){
    socketInstance.emit("PLAY CARD", player_id, card_to_play)
  }
  
  function refreshBoard(){
    socketInstance.emit("GET BOARD STATE", player_id);
  }

  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bluffstopp</h1>
        <button onClick={() => addPlayer()}>Add players</button>
        <button onClick={() => startGame()}>Start game</button>
        <button onClick={() => refreshBoard()}>Refresh board</button>
        <p>Players in the game: {players}</p>
        <p>Current player: {currentPlayerName}</p>
        <p>Your hand: {hand}</p>
        <p>Last card played: {lastPlayedCard}</p>
        <PlayerHand cards={hand} onPlay={playCard}/>
      </header>
    </div>
  );
}

export default App;
