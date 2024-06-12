import './Menu.css';

const Menu = ({ startGame, selectLevel, quitGame }) => {
  return (
    <div className="menu-container">
      <div className="menu-item" onClick={startGame}>
        <span className="arrow">➔</span> START GAME <span className="arrow">➔</span>
      </div>
      <div className="menu-item" onClick={selectLevel}>
        CONFIG
      </div>
      <div className="menu-item" onClick={() => console.log('Credits')}>
        CREDITS
      </div>
      <div className="menu-item" onClick={quitGame}>
        EXIT GAME
      </div>
    </div>
  );
};

export default Menu;
