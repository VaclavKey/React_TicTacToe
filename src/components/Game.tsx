import { useState } from 'react';
import Board from './Board'

const Game: React.FC = () => {
  const [history, setHistory] = useState<(string | null)[][]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [sortAsc, setSortAsc] = useState(false);
  const [moveDetails, setMoveDetails] = useState<{ row: number, col: number}[]>([]);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handleSortButton() {
    setSortAsc(!sortAsc);
  }
  
  function handlePlay(nextSquares: (string | null)[], row: number, col: number) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setMoveDetails([...moveDetails, { row, col }])
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((_, move) => {
    let description;
    if (move > 0 && move !== currentMove) {
      const { row, col } = moveDetails[move - 1];
      description = `Go to move #${move} | Row: ${row} Col: ${col}`;
    } else if (move === currentMove) {
      description = currentMove === 0 
      ? `You are at game start`
      : `You are at #${move}`
    } else {
      description = 'Go to game start';
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol
          reversed={sortAsc ? false : true}
          start={sortAsc ? 0 : moves.length - 1}
        >
          {sortAsc ? moves : moves.reverse()}
        </ol>
      </div>
      <button className="sort-button" onClick={handleSortButton}>{sortAsc ? 'Sort ASC' : 'Sort DESC'}</button>
    </div>
  );
}

export default Game;