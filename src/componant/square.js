import React from 'react';

export default function Square({ value, onClick, highlight }) {
  return (
    <button
      className={
        "square " + (highlight ? 'highlight' : '') + (value ? ' filled' : '')
      }
      onClick={onClick}
      aria-pressed={!!value}
      aria-label={value ? `Square ${value}` : 'Empty square'}
    >
      <span className="symbol">{value}</span>
    </button>
  );
}
