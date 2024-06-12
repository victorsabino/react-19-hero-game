import React, { useState } from 'react';
import Game from './components/Game';
import Menu from './components/Menu';
import Story from './components/Story';

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [showStory, setShowStory] = useState(false);

  const startGame = () => {
    setShowMenu(false);
    setShowStory(true);
    setTimeout(() => {
      setShowStory(false);
      setGameStarted(true);
    }, 10000);  // Show story for 10 seconds
  };

  const skipStory = () => {
    setShowStory(false);
    setGameStarted(true);
  };

  const selectLevel = () => {
    console.log('Select Level');
  };

  const quitGame = () => {
    console.log('Quit Game');
  };

  return (
    <div>
      {showMenu && <Menu startGame={startGame} selectLevel={selectLevel} quitGame={quitGame} />}
      {showStory && <Story skipStory={skipStory} />}
      {gameStarted && <Game />}
    </div>
  );
};

export default App;
