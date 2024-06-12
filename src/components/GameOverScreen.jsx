import React from 'react';
import './GameOverScreen.css';

const GameOverScreen = ({ restartGame, error }) => {
  return (
    <div className="game-over-container">
      <div className="error-message">
        <pre>{error}</pre>
      </div>
      <div className="menu-container">
        <div className="menu-item" onClick={restartGame}>
          <span className="arrow">➔</span> RESTART GAME <span className="arrow">➔</span>
        </div>
        <div className="menu-item" onClick={() => console.log('Credits')}>
          CREDITS
        </div>
        <div className="menu-item" onClick={() => console.log('Config')}>
          CONFIG
        </div>
        <div className="menu-item" onClick={() => window.location.reload()}>
          EXIT GAME
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;
