import Square from './Square'

type BoardProps = {
  xIsNext: boolean,
  squares: (string | null)[],
  onPlay: (squares: (string | null)[], row: number, col: number) => void
};

const Board: React.FC<BoardProps> = ({ xIsNext, squares, onPlay}) => {
  function handleClick(i: number, row: number, col: number) {
    if (winnerInfo || squares[i]) return;
    
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O'
    
    onPlay(nextSquares, row, col);
  }
  
  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo?.winner;
  const winnerCells = winnerInfo?.line || [];

  let status = winner
  ? 'Winner: ' + winner
  : 'Next player: ' + (xIsNext ? 'X' : 'O');

  if (!squares.includes(null) && !winner) status = 'Draw';
  
  return (
    <>
      <div className="status">{status}</div>
      <div className="board">
        {Array(3).fill(null).map((_, row) => (
          <div className="board-row" key={row}>
            {Array(3).fill(null).map((_, col) => {
              const index = row * 3 + col;
              return (
                <Square 
                  key={index} 
                  value={squares[index]} 
                  onSquareClick={() => handleClick(index, row+1, col+1)}
                  isWinning={winnerCells?.includes(index)}
                />
            );
          })}
          </div>
        ))}
      </div>
    </>
  );
}

function calculateWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

export default Board;