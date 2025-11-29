import React, { useState } from 'react';
import Menu from './components/Menu';
import Game from './components/Game';

function App() {
  const [gameMode, setGameMode] = useState(null); // '1P' or '2P'
  const [difficulty, setDifficulty] = useState('Medium');

  const handleStartGame = (mode, diff) => {
    setGameMode(mode);
    if (diff) setDifficulty(diff);
  };

  const handleBackToMenu = () => {
    setGameMode(null);
  };

  return (
    <div className="app-container">
      {!gameMode ? (
        <Menu onStart={handleStartGame} />
      ) : (
        <Game mode={gameMode} difficulty={difficulty} onBack={handleBackToMenu} />
      )}
    </div>
  );
}

export default App;
