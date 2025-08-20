import React from 'react';
import Square from './square';

export default function Board({ squares, onClick, highlight }) {
  const renderSquare = (i) => (
    <Square
      key={i}
      value={squares[i]}
      onClick={() => onClick(i)}
      highlight={highlight && highlight.includes(i)}
    />
  );

  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe board">
      {[0, 1, 2].map(r => (
        <div className="board-row" key={r} role="row">
          {renderSquare(r * 3 + 0)}
          {renderSquare(r * 3 + 1)}
          {renderSquare(r * 3 + 2)}
        </div>
      ))}
    </div>
  );
}
