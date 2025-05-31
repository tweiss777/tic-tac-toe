

export type GameRoom = {
    board: string[][];
    currentPLayer: 'X' | 'O';
    winner: 'X' | 'O' | null;
    moves : number
    players: string[]
}

export type PlayerMove ={ 
    roomId: string; 
    row: number; 
    col: number 
}
