import React, { useState, useEffect } from 'react';
import './Game.css';
import { generateGrid, initializeGame, movePlayer, moveEnemiesTowardsPlayer, checkCollisions, activatePower } from '../gameLogic';
import playerData from '../data/playerData';
import itemsData from '../data/itemsData';
import enemiesData from '../data/enemiesData';
import reactConcepts from '../data/conceptsData';
import Modal from './Modal';
import GameOverScreen from './GameOverScreen';
import attackData from '../data/attackData';

const Game = () => {
  const width = 20;
  const height = 20;
  const [gameState, setGameState] = useState(() => initializeGame(width, height, playerData, itemsData, enemiesData, reactConcepts, 1));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentConcept, setCurrentConcept] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isModalOpen || isGameOver) return; // Do not move player when modal is open or game over

      const { key } = event;
      if (key === ' ') {
        console.log("spacebar");
        return handleSpacebarPress();
      }
      setGameState(prevState => {
        const newPlayerPos = movePlayer(prevState.playerPos, key, width, height);
        const { collectedItemIndex, encounteredEnemyIndex, collectedConceptIndex } = checkCollisions(newPlayerPos, prevState.itemsPos, prevState.enemiesPos, prevState.conceptsPos);

        let newGrid = generateGrid(width, height, ' ');
        newGrid[newPlayerPos[1]][newPlayerPos[0]] = playerData.symbol;
        prevState.itemsPos.forEach((pos, index) => {
          if (index !== collectedItemIndex) newGrid[pos[1]][pos[0]] = itemsData[index % itemsData.length].symbol;
        });
        prevState.enemiesPos.forEach((pos, index) => newGrid[pos[1]][pos[0]] = enemiesData[index % enemiesData.length].symbol);
        prevState.conceptsPos.forEach((pos, index) => {
          if (index !== collectedConceptIndex) newGrid[pos[1]][pos[0]] = reactConcepts[index].symbol;
        });

        let newItemsPos = [...prevState.itemsPos];
        if (collectedItemIndex !== -1) {
          newItemsPos.splice(collectedItemIndex, 1);
        }

        let newEnemiesPos = [...prevState.enemiesPos];
        if (encounteredEnemyIndex !== -1) {
          if (prevState.invulnerableTicks > 0) {
            newEnemiesPos.splice(encounteredEnemyIndex, 1);
          } else {
            setIsGameOver(true);
            return prevState;
          }
        }

        let newConceptsPos = [...prevState.conceptsPos];
        let newCurrentPower = prevState.currentPower;
        if (collectedConceptIndex !== -1) {
          const concept = reactConcepts[collectedConceptIndex];
          setCurrentConcept(concept);
          setIsModalOpen(true);
          newConceptsPos.splice(collectedConceptIndex, 1);
          newCurrentPower = attackData.find(a => a.name === concept.effect);
          console.log({newCurrentPower, attackData, concept})
        }

        return {
          ...prevState,
          playerPos: newPlayerPos,
          itemsPos: newItemsPos,
          enemiesPos: newEnemiesPos,
          conceptsPos: newConceptsPos,
          grid: newGrid,
          score: collectedConceptIndex !== -1 ? prevState.score + 10 : prevState.score,
          currentPower: newCurrentPower,
        };
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [width, height, isModalOpen, isGameOver, gameState.enemiesPos]);

  const handleSpacebarPress = () => {
    setGameState(prevState => {
      if (!prevState.currentPower) return prevState;
    
      const { effect, symbol, name } = prevState.currentPower;
      const effectArea = activatePower(name, prevState.playerPos, width, height);
    
      let newGrid = [...prevState.grid];
      let newEnemiesPos = [...prevState.enemiesPos];
    
      // Function to apply effect and update grid
      const applyEffect = (grid, enemiesPos, effectArea, symbol) => {
        effectArea.forEach(([x, y]) => {
          if (grid[y] && grid[y][x]) {
            grid[y][x] = symbol;
          }
        });
    
        effectArea.forEach(([x, y]) => {
          const enemyIndex = enemiesPos.findIndex(pos => pos[0] === x && pos[1] === y);
          if (enemyIndex !== -1) {
            enemiesPos.splice(enemyIndex, 1);
            prevState.score += 100;
          }
        });
    
        return { grid, enemiesPos };
      };
    
      // Initial application of the effect
      let result = applyEffect(newGrid, newEnemiesPos, effectArea, symbol);
      newGrid = result.grid;
      newEnemiesPos = result.enemiesPos;
    
      // Set initial state update
      const updateState = {
        ...prevState,
        enemiesPos: newEnemiesPos,
        grid: newGrid,
        currentPower: null,
      };
    
      // Schedule lingering effect
      const lingerDuration = 1000; // Linger for half a second
      const interval = 50; // Interval for reapplying the effect
    
      const lingerEffect = () => {
        setGameState(prevState => {
          if (!prevState.currentPower) return prevState;
    
          const { effectArea, symbol } = prevState.currentPower;
          let newGrid = [...prevState.grid];
          let newEnemiesPos = [...prevState.enemiesPos];
    
          // Reapply effect
          let result = applyEffect(newGrid, newEnemiesPos, effectArea, symbol);
          newGrid = result.grid;
          newEnemiesPos = result.enemiesPos;
    
          return {
            ...prevState,
            enemiesPos: newEnemiesPos,
            grid: newGrid,
          };
        });
      };
    
      // Set interval for the lingering effect
      const intervalId = setInterval(lingerEffect, interval);
    
      // Clear the interval after the linger duration
      setTimeout(() => clearInterval(intervalId), lingerDuration);
    
      return updateState;
    });
  };

  useEffect(() => {
    const enemyMoveInterval = setInterval(() => {
      if (!isModalOpen) {
        setGameState(prevState => {
          const newEnemiesPos = moveEnemiesTowardsPlayer(prevState.enemiesPos, prevState.playerPos, width, height);
          let newGrid = generateGrid(width, height, ' ');
          newGrid[prevState.playerPos[1]][prevState.playerPos[0]] = playerData.symbol;
          prevState.itemsPos.forEach((pos, index) => newGrid[pos[1]][pos[0]] = itemsData[index % itemsData.length].symbol);
          newEnemiesPos.forEach((pos, index) => newGrid[pos[1]][pos[0]] = enemiesData[index % enemiesData.length].symbol);
          prevState.conceptsPos.forEach((pos, index) => newGrid[pos[1]][pos[0]] = reactConcepts[index].symbol);

          return {
            ...prevState,
            enemiesPos: newEnemiesPos,
            grid: newGrid,
          };
        });
      }
    }, 1000 / (gameState.level/2 + 0.1)); // Adjust speed based on level

    return () => clearInterval(enemyMoveInterval);
  }, [gameState.level, width, height, isModalOpen]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const restartGame = () => {
    setIsGameOver(false);
    setGameState(initializeGame(width, height, playerData, itemsData, enemiesData, reactConcepts, 1));
  };

  const proceedToNextLevel = () => {
    setGameState(prevState => initializeGame(width, height, playerData, itemsData, enemiesData, reactConcepts, prevState.level + 1));
  };

  return (
    <div className="game">
      {!isGameOver && <>{gameState.grid.map((row, rowIndex) => (
        <div className="grid-row" key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <div className={`grid-cell`} key={cellIndex}>
              {cell}
            </div>
          ))}
        </div>
      ))}
      <div className="game-info">
        <p>Level: {gameState.level} | Score: {gameState.score} | High Score: {gameState.highScore} ({gameState.highScoreName})</p>
        <p>Current Power: {gameState.currentPower ? gameState.currentPower.symbol : 'None'}</p>
        <p>Current Item: {gameState.currentItem ? gameState.currentItem.name : 'None'} | Invulnerable Ticks: {gameState.invulnerableTicks} | Extra Lives: {gameState.extraLives}</p>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} concept={currentConcept} /></>}
      {isGameOver && <GameOverScreen restartGame={restartGame} />}
      {gameState.conceptsPos.length === 0 && !isGameOver && (
        <div className="next-level-overlay">
          <button onClick={proceedToNextLevel}>Proceed to Next Level</button>
        </div>
      )}
    </div>
  );
};

export default Game;
