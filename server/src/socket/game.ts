import { Server, Socket } from 'socket.io'
import { handleJoin } from "../events/handleJoin";
import { handleLeave } from "../events/handleLeave";
import { handleMove } from "../events/handleMove";

export function registerGameHandlers(io: Server, socket: Socket) {
  socket.on('join', (roomId: string) => handleJoin(io, socket, roomId));
  socket.on('move', (move) => handleMove(io, socket, move));
  socket.on('leave', () => handleLeave(io, socket));
}