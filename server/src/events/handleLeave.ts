import { Server, Socket } from "socket.io";
import { rooms } from "../state/game.utils";

export function handleLeave(io: Server, socket: Socket) {
  console.log(rooms)
  console.log(socket.id)
  for (const [roomId, room] of Object.entries(rooms)) {
    const index = room.players.indexOf(socket.id);
    if (index !== -1) {
      room.players.splice(index, 1);
      socket.leave(roomId);
      io.to(roomId).emit("playerLeft", socket.id);
      if (room.players.length === 0) {
        delete rooms[roomId];
      }
      break;
    }
  }
}