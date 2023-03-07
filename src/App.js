import React, { useState, useEffect} from 'react';
import './App.css';
import { io } from "socket.io-client";
import PlayerHand from "./components/PlayerHand"

function App() {

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

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
      
    socket.emit("ADD PLAYER", "Bob", "123");
    //socket.emit("ADD PLAYER", "Bob", "123");
    socket.emit("GET BOARD STATE", "123");

  }, []);


  function playCard(card_to_play){
    console.log("Playing card" + card_to_play)
    socketInstance.emit("PLAY CARD", "123", card_to_play)
  }

  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello</h1>
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
