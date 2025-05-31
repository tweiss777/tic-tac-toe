import Game from "./components/Game";
import { useState, useEffect } from "react";
import socket from "./client-socket";

function App() {
  const [board, setBoard] = useState<string[][]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [mySymbol, setMySymbol] = useState<"X" | "O" | null>(null);
  const [winner, setWinner] = useState<string>("no one");
  const [roomId] = useState<string>("abc123");

  useEffect(() => {
    socket.emit("join", roomId);
  
    socket.on("joined", (data) => {
      setBoard(data.board);
      setCurrentPlayer(data.currentPlayer);
  
      setMySymbol(socket.id === data.firstPlayerId ? "X" : "O");
    });
  
    socket.on("start", (data) => {
      setBoard(data.board);
      setCurrentPlayer(data.currentPlayer);
    });
  
    socket.on("moveMade", (data) => {
      setBoard(data.board);
      setCurrentPlayer(data.currentPlayer);
    });
  
    socket.on("gameOver", (data) => {
      setBoard(data.board);
      setWinner(data.winner || "No one");
    });
  
    socket.on("errorMessage", (msg) => {
      alert("Error: " + msg);
    });
  
    socket.on("playerLeft", (id) => {
      alert(`Player left: ${id}`);
    });
  
    return () => {
      socket.off("joined");
      socket.off("start");
      socket.off("moveMade");
      socket.off("gameOver");
      socket.off("errorMessage");
      socket.off("playerLeft");
    };
  }, []);

  function handleFill(row: number, col: number, _char: string) {
    socket.emit("move", { roomId, row, col });
  }

  return (
    <>
      <h1>You are: {mySymbol}</h1>
      {winner !== "no one" && <h2>{winner} wins!</h2>}
      <Game board={board} handleFill={handleFill} currentPlayer={`player ${currentPlayer.toLowerCase()}`} />
    </>
  );
}

export default App;