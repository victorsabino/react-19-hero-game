export const generateGrid = (width, height, defaultSymbol) => {
  const grid = [];
  for (let i = 0; i < height; i++) {
    const row = [];
    for (let j = 0; j < width; j++) {
      row.push(defaultSymbol);
    }
    grid.push(row);
  }
  return grid;
};

export const generatePositions = (count, excludePositions, width, height) => {
  const positions = [];
  while (positions.length < count) {
    const pos = [Math.floor(Math.random() * width), Math.floor(Math.random() * height)];
    if (!excludePositions.some(ep => ep[0] === pos[0] && ep[1] === pos[1])) {
      positions.push(pos);
    }
  }
  return positions;
};

export const initializeGame = (width, height, playerData, itemsData, enemiesData, reactConcepts, level) => {
  const playerPos = [Math.floor(width / 2), Math.floor(height / 2)];
  const itemCount = level + 4; // Number of items increases with level
  const enemyCount = level * 2 + 3; // Number of enemies increases with level
  const conceptCount = reactConcepts.length; // Number of concepts

  const itemsPos = generatePositions(itemCount, [playerPos], width, height);
  const enemiesPos = generatePositions(enemyCount, [playerPos, ...itemsPos], width, height);
  const conceptsPos = generatePositions(conceptCount, [playerPos, ...itemsPos, ...enemiesPos], width, height);

  const grid = generateGrid(width, height, ' ');
  grid[playerPos[1]][playerPos[0]] = playerData.symbol;
  itemsPos.forEach((pos, index) => grid[pos[1]][pos[0]] = itemsData[index % itemsData.length].symbol);
  enemiesPos.forEach((pos, index) => grid[pos[1]][pos[0]] = enemiesData[index % enemiesData.length].symbol);
  conceptsPos.forEach((pos, index) => grid[pos[1]][pos[0]] = reactConcepts[index].symbol);

  return {
    playerPos,
    itemsPos,
    enemiesPos,
    conceptsPos,
    grid,
    level,
    score: 0,
    highScore: 0,
    highScoreName: '',
    invulnerableTicks: 0,
    extraLives: 0,
    currentPower: null,
    currentItem: null,
  };
};

export const movePlayer = (playerPos, direction, width, height) => {
  const newPos = [...playerPos];
  if (direction === 'w' && playerPos[1] > 0) {
    newPos[1] -= 1;
  } else if (direction === 's' && playerPos[1] < height - 1) {
    newPos[1] += 1;
  } else if (direction === 'a' && playerPos[0] > 0) {
    newPos[0] -= 1;
  } else if (direction === 'd' && playerPos[0] < width - 1) {
    newPos[0] += 1;
  }
  return newPos;
};

export const moveEnemiesTowardsPlayer = (enemiesPos, playerPos, width, height) => {
  return enemiesPos.map(pos => {
    const newPos = [...pos];
    if (pos[0] < playerPos[0]) {
      newPos[0] += 1;
    } else if (pos[0] > playerPos[0]) {
      newPos[0] -= 1;
    }
    if (pos[1] < playerPos[1]) {
      newPos[1] += 1;
    } else if (pos[1] > playerPos[1]) {
      newPos[1] -= 1;
    }
    return newPos;
  });
};

export const checkCollisions = (playerPos, itemsPos, enemiesPos, conceptsPos) => {
  const collectedItemIndex = itemsPos.findIndex(pos => pos[0] === playerPos[0] && pos[1] === playerPos[1]);
  const encounteredEnemyIndex = enemiesPos.findIndex(pos => pos[0] === playerPos[0] && pos[1] === playerPos[1]);
  const collectedConceptIndex = conceptsPos.findIndex(pos => pos[0] === playerPos[0] && pos[1] === playerPos[1]);

  return { collectedItemIndex, encounteredEnemyIndex, collectedConceptIndex };
};

export const activatePower = (effect, playerPos, width, height) => {
  console.log("activatePower", effect)
  let effectArea = [];
  const [playerX, playerY] = playerPos;

  switch (effect) {
    case 'Fire Wave':
      for (let i = playerY - 2; i <= playerY + 2; i++) {
        for (let j = playerX - Math.abs(playerY - i); j <= playerX + Math.abs(playerY - i); j++) {
          if (0 <= j && j < width && 0 <= i && i < height) {
            effectArea.push([j, i]);
          }
        }
      }
      break;
    case 'Explosion':
      for (let i = playerY - 1; i <= playerY + 1; i++) {
        for (let j = playerX - 1; j <= playerX + 1; j++) {
          if (0 <= j && j < width && 0 <= i && i < height) {
            effectArea.push([j, i]);
          }
        }
      }
      break;
    case 'Tornado':
      for (let i = playerY - 3; i <= playerY + 3; i++) {
        for (let j = playerX - 3; j <= playerX + 3; j++) {
          if (0 <= j && j < width && 0 <= i && i < height) {
            effectArea.push([j, i]);
          }
        }
      }
      break;
    case 'Lightning':
      for (let i = playerY - 5; i <= playerY + 5; i++) {
        if (0 <= i && i < height) {
          effectArea.push([playerX, i]);
        }
      }
      break;
    case 'Starburst':
      for (let i = playerY - 2; i <= playerY + 2; i++) {
        for (let j = playerX - 2; j <= playerX + 2; j++) {
          if (0 <= j && j < width && 0 <= i && i < height) {
            effectArea.push([j, i]);
          }
        }
      }
      break;
    case 'Wind Blast':
      for (let i = playerY - 1; i <= playerY + 1; i++) {
        if (0 <= i && i < height) {
          effectArea.push([playerX, i]);
          if (0 <= playerX + 1 && playerX + 1 < width) {
            effectArea.push([playerX + 1, i]);
          }
          if (0 <= playerX - 1 && playerX - 1 < width) {
            effectArea.push([playerX - 1, i]);
          }
        }
      }
      break;
    case 'Ice Blast':
      for (let i = playerY - 2; i <= playerY + 2; i++) {
        for (let j = playerX - 2; j <= playerX + 2; j++) {
          if (0 <= j && j < width && 0 <= i && i < height) {
            effectArea.push([j, i]);
          }
        }
      }
      break;
    case 'Magic Spark':
      for (let i = playerY - 2; i <= playerY + 2; i++) {
        for (let j = playerX - 2; j <= playerX + 2; j++) {
          if (0 <= j && j < width && 0 <= i && i < height) {
            effectArea.push([j, i]);
          }
        }
      }
      break;
    case 'Storm':
      for (let i = playerY - 3; i <= playerY + 3; i++) {
        for (let j = playerX - 3; j <= playerX + 3; j++) {
          if (0 <= j && j < width && 0 <= i && i < height) {
            effectArea.push([j, i]);
          }
        }
      }
      break;
    default:
      break;
  }

  return effectArea;
};


