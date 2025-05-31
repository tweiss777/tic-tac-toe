import { Server, Socket } from "socket.io";
import { PlayerMove } from "../types/game.types";
import { rooms, checkWinner } from "../state/game.utils";

export function handleMove(io: Server, socket: Socket, move: PlayerMove) {
  console.log(rooms)
  const room = rooms[move.roomId];
  if (!room) {
    socket.emit("errorMessage", "Invalid Room!");
    return;
  }

  const playerIndex = room.players.indexOf(socket.id);
  if (playerIndex === -1) {
    socket.emit("errorMessage", "You are not in the room!");
    return;
  }

  const playerSymbol = playerIndex === 0 ? "X" : "O";

  if (room.currentPLayer !== playerSymbol) {
    socket.emit("errorMessage", "It is not your turn!");
    return;
  }

  if (room.board[move.row][move.col] !== "_") {
    socket.emit("errorMessage", "Cell already filled!");
    return;
  }

  room.board[move.row][move.col] = playerSymbol;
  room.moves++;

  if (checkWinner(room.board, playerSymbol)) {
    room.winner = playerSymbol;
    io.to(move.roomId).emit("gameOver", {
      winner: playerSymbol,
      board: room.board,
    });
    delete rooms[move.roomId];
    return;
  }

  if (room.moves === 9) {
    io.to(move.roomId).emit("gameOver", {
      winner: null,
      board: room.board,
    });
    delete rooms[move.roomId];
    return;
  }

  room.currentPLayer = playerSymbol === "X" ? "O" : "X";

  io.to(move.roomId).emit("moveMade", {
    board: room.board,
    currentPlayer: room.currentPLayer,
  });
}