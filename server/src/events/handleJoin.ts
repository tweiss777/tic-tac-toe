import { Server, Socket } from "socket.io";
import { rooms, createNewGame } from "../state/game.utils";
import { GameRoom } from "../types/game.types";

export function handleJoin(io: Server, socket: Socket, roomId: string) {
  if (!rooms[roomId]) {
    rooms[roomId] = createNewGame();
  }

  const room: GameRoom = rooms[roomId];

  if (room.players.length >= 2) {
    socket.emit("error", "Room is full");
    return;
  }

  room.players.push(socket.id);
  socket.join(roomId);

  socket.emit("joined", {
    board: room.board,
    currentPlayer: room.currentPLayer,
    firstPlayerId: room.players[0] // tell client who is "X"
  });

  if (room.players.length === 2) {
    io.to(roomId).emit("start", {
      board: room.board,
      currentPlayer: room.currentPLayer,
    });
  }
}