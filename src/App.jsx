import React, { useState } from 'react';
import Menu from './components/Menu';
import Game from './components/Game';

function App() {
  const [gameMode, setGameMode] = useState(null);
  const [difficulty, setDifficulty] = useState('Medium');
  const [isAdvanced, setIsAdvanced] = useState(false);

  const handleStartGame = (mode, diff) => {
    setGameMode(mode);
    if (diff) setDifficulty(diff);
  };

  const handleBackToMenu = () => {
    setGameMode(null);
  };

  const handleAdvancedToggle = (advanced) => {
    setIsAdvanced(advanced);
  };

  return (
    <div className={`app-container ${isAdvanced ? 'advanced-mode' : ''}`}>
      {!gameMode ? (
        <Menu
          onStart={handleStartGame}
          onAdvancedToggle={handleAdvancedToggle}
          isAdvanced={isAdvanced}
        />
      ) : (
        <Game mode={gameMode} difficulty={difficulty} onBack={handleBackToMenu} />
      )}
    </div>
  );
}

export default App;
