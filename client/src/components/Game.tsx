import Cell from './Cell';
import BoardRow from './BoardRow';

interface IProps {
  handleFill: (row: number, col: number, char: string) => void;
  board: string[][];
  currentPlayer: string;
}
export default function Game({ handleFill, board, currentPlayer }: IProps) {
  function fill(row: number, col: number) {
    const currentLetter = currentPlayer === 'player x' ? 'x' : 'o';
    handleFill(row, col, currentLetter);
  }

  return (
    <div className="board-container">
      <h1> {currentPlayer}'s turn! </h1>
      {board.map((row, rowIndex) => (
        <>
          <BoardRow>
            {row.map((col, colIndex) => (
              <Cell
                onClick={() => fill(rowIndex, colIndex)}
                key={colIndex}
                cell={col}
              />
            ))}
          </BoardRow>
        </>
      ))}
    </div>
  );
}
