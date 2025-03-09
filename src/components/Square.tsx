type SquareProps = {
  value: string | null,
  onSquareClick: () => void,
  isWinning: boolean;
};

const Square: React.FC<SquareProps> = ({ value, onSquareClick, isWinning }) => {
  return (
    <button className={`square ${isWinning ? 'winning' : ''}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default Square;