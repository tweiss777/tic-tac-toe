import { GameRoom } from "../types/game.types";
export const rooms: Record<string, GameRoom> = {};

export const createNewGame = (): GameRoom => ({
  board: [
    ['_', '_', '_'],
    ['_', '_', '_'],
    ['_', '_', '_'],
  ],
  currentPLayer: 'X',
  winner: null,
  moves: 0,
  players: []

});


export function checkWinner(board: string[][], char: string): boolean {
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === char && board[i][1] === char && board[i][2] === char) return true;
    if (board[0][i] === char && board[1][i] === char && board[2][i] === char) return true;
  }
  if (board[0][0] === char && board[1][1] === char && board[2][2] === char) return true;
  if (board[0][2] === char && board[1][1] === char && board[2][0] === char) return true;
  return false;
}
