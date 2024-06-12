import React from 'react';
import './Grid.css';

const Grid = ({ grid, score, highScore, highScoreName, currentPower, currentItem, invulnerableTicks, extraLives }) => {
  return (
    <div>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {row.map((cell, cellIndex) => (
            <span key={cellIndex} className="grid-cell">{cell}</span>
          ))}
        </div>
      ))}
      <div className="game-info">
        <p>Level: {score} | Score: {score} | High Score: {highScore} ({highScoreName})</p>
        <p>Current Power: {currentPower ? `${currentPower.power} (${currentPower.effect})` : 'None'}</p>
        <p>Current Item: {currentItem ? currentItem : 'None'} | Invulnerable Ticks: {invulnerableTicks} | Extra Lives: {extraLives}</p>
      </div>
    </div>
  );
};

export default Grid;
