import React, { useState, useEffect} from 'react';
import './App.css';
import { io } from "socket.io-client";
import * as Cookies from "./lib/cookies";
import PlayerHand from "./components/PlayerHand"
import Board from './components/Board';
import {ThemeProvider} from '@primer/react'
import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom"

function App() {

  Cookies.createUUIDandSetInCookieIfDoesNotExist();
  const player_id = Cookies.getUUIDFromCookie();

  const [socketInstance, setSocketInstance] = useState("");
  const [players, setPlayers] = useState([]);
  const [hand, setHand] = useState([]);
  const [currentPlayerName, setCurrentPlayerName] = useState("");
  const [lastActualCard, setLastActualCard] = useState("");
  const [isActualCardHidden, setIsActualCardHidden] = useState(true);
  const [lastDeclaredCard, setLastDeclaredCard] = useState();
  const [isClientCurrentPlayer, setIsClientCurrentPlayer] = useState();
  const [didClientPlayLastCard, setDidClientPlayLastCard] = useState();
  const [isGameOver, setIsGameOver] = useState(false);

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

      console.log("Start of if statement")
      console.log(publicGameState["playerThatPlayedLastCard"])
      console.log(player_id)

      if(publicGameState["playerThatPlayedLastCard"] === player_id){
        setDidClientPlayLastCard(true)
      }
      else{
        setDidClientPlayLastCard(false)
      }

      console.log(didClientPlayLastCard)
    });
    
    socket.on("REQUEST PRIVATE GAME STATE", () => {
      socket.emit("GET PRIVATE GAME STATE", player_id)
    });
    
    socket.on("UPDATE PRIVATE GAME STATE", (privateGameState) => {
      setHand(privateGameState["playerHand"]);
      setIsClientCurrentPlayer(privateGameState["isClientCurrentPlayer"]);
    });

    socket.on("GAME OVER", (winning_player) => {
      setIsGameOver(true);
    })

  }, []);

  function addPlayer(){
    // TODO - update with actual player names instead of player_id
    socketInstance.emit("ADD PLAYER", player_id, player_id);
  }
  
  function startGame(){
    socketInstance.emit("START GAME");
    socketInstance.emit("GET PRIVATE GAME STATE", player_id);
  }
  
  function playCard(cardActual, cardDeclared){
    let cardActualStr = cardActual.suit + " " + cardActual.value;
    let cardDeclaredStr = cardDeclared.suit + " " + cardDeclared.value;
    socketInstance.emit("PLAY CARD", player_id, cardActualStr, cardDeclaredStr);
  }

  function passTurn(){
    socketInstance.emit("PASS TURN", player_id);

  }
  
  function refreshGameState(){
    socketInstance.emit("GET PUBLIC GAME STATE");
    socketInstance.emit("GET PRIVATE GAME STATE", player_id);
  }

  function callBluff(){
    socketInstance.emit("CALL BLUFF", player_id);
  }

  return (
    <BrowserRouter>
      <div>
            <Routes>
              <Route path="/" element={
                isGameOver ? <Navigate to="/game-over" /> :
              <ThemeProvider>
                {isGameOver ? <p>The game is over! </p>:""}

                <button onClick={() => addPlayer()}>Add players</button>
                <button onClick={() => startGame()}>Start game</button>
                <button onClick={() => refreshGameState()}>Refresh game state</button>
                <p>Players in the game: {players}</p>
                <p>Current player: {currentPlayerName}</p>
                <p>Are you the current player? {String(isClientCurrentPlayer)}</p>
                <Board
                      lastActualCard={lastActualCard}
                      isActualCardHidden={isActualCardHidden}
                      lastDeclaredCard={lastDeclaredCard}
                      isClientCurrentPlayer={isClientCurrentPlayer}
                      didClientPlayLastCard={didClientPlayLastCard}
                      callBluff={callBluff}
                      passTurn={passTurn}/>
                <PlayerHand
                      cards={hand}
                      onPlay={playCard}
                      lastDeclaredCard={lastDeclaredCard}/>
              </ThemeProvider>
                }/>
        <Route path="/game-over" element={<h1>Game over!</h1>}/>
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
