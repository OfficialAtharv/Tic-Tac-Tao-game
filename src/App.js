import React, { useState, useEffect } from 'react';
import Board from './componant/Board';
import { calculateWinner } from './helper';

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([]);
  const [winnerInfo, setWinnerInfo] = useState(null);
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const result = calculateWinner(squares);
    setWinnerInfo(result);
    if (result && result.winner) {
      setScore(prev => ({ ...prev, [result.winner]: prev[result.winner] + 1 }));
    }
  }, [squares]);

  function handleClick(i) {
    if (squares[i] || (winnerInfo && winnerInfo.winner)) return;
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setHistory(h => [...h, squares]);
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  function undo() {
    if (!history.length) return;
    const prev = history[history.length - 1];
    setHistory(h => h.slice(0, -1));
    setSquares(prev);
    setXIsNext(s => !s);
    setWinnerInfo(null);
  }

  function reset(pushScore = true) {
    setSquares(Array(9).fill(null));
    setHistory([]);
    setXIsNext(true);
    setWinnerInfo(null);
    if (!pushScore) setScore({ X: 0, O: 0 });
  }

  function newRound() {
    setSquares(Array(9).fill(null));
    setHistory([]);
    setXIsNext(true);
    setWinnerInfo(null);
  }

  const statusText = winnerInfo && winnerInfo.winner
    ? `Winner: ${winnerInfo.winner}`
    : winnerInfo && winnerInfo.isDraw
      ? 'Draw!'
      : `Next: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className={"app " + (isDark ? 'theme-dark' : 'theme-light')}>
      <header className="topbar">
        <div className="brand">
          <div className="logo">✦</div>
          <div>
            <h1>Tic Tac ✖︎ O</h1>
           
          </div>
        </div>
        {/* <div className="controls">
          <button className="btn ghost" onClick={() => setIsDark(d => !d)}>
            {isDark ? '🌞 Light' : '🌙 Dark'}
          </button>
          <button className="btn" onClick={() => reset(false)}>Reset Scores</button>
        </div> */}
      </header>

      <main className="main">
        <section className="game-card glass">
          <div className="game-left">
            <Board squares={squares} onClick={handleClick} highlight={winnerInfo && winnerInfo.line} />
          </div>
          <aside className="game-right">
            <div className="panel">
              <div className="status">{statusText}</div>
              <div className="score">
                <div className="score-item">
                  <div className="mark x">X</div>
                  <div className="num">{score.X}</div>
                </div>
                <div className="score-item">
                  <div className="mark o">O</div>
                  <div className="num">{score.O}</div>
                </div>
              </div>
              <div className="actions">
                <button className="btn" onClick={undo} disabled={!history.length}>Undo</button>
                <button className="btn" onClick={newRound}>New Round</button>
                <button className="btn danger" onClick={() => reset(true)}>Full Reset</button>
              </div>
            </div>
          </aside>
        </section>
      </main>

      
    </div>
  );
}
