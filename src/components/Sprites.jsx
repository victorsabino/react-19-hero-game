import React from 'react';
import './Sprites.css';

const Grid = ({ grid, playerPos, itemsPos, enemiesPos, currentPower, score, highScore, highScoreName, invulnerableTicks, extraLives }) => {
  return (
    <div className="grid-container">
      {grid.map((row, y) => (
        <div key={y} className="grid-row">
          {row.map((cell, x) => {
            let className = 'spritesheet ';
            if (cell === '⚫') className += 'ground';
            if (cell === '🟥') className += 'wall';
            if (cell === '🌊') className += 'water';

            const isPlayer = playerPos[0] === x && playerPos[1] === y;
            const isItem = itemsPos.some(pos => pos[0] === x && pos[1] === y);
            const isEnemy = enemiesPos.some(pos => pos[0] === x && pos[1] === y);

            if (isPlayer) className += ' player';
            if (isItem) className += ' health-potion'; // Example for health potion, change as needed
            if (isEnemy) className += ' error'; // Example for error enemy, change as needed

            return <div key={x} className={className}></div>;
          })}
        </div>
      ))}
      <div className="game-info">
        <p>Level: 0 | Score: 0 | High Score: 0 ()</p>
        <p>Current Power: None</p>
        <p>Current Item: None | Invulnerable Ticks: 0 | Extra Lives: 0</p>
      </div>
    </div>
  );
};

export default Grid;
