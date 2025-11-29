import React, { useState } from 'react';

const Menu = ({ onStart }) => {
    const [mode, setMode] = useState(null);
    const [difficulty, setDifficulty] = useState('Medium');

    const handleModeSelect = (selectedMode) => {
        setMode(selectedMode);
        if (selectedMode === '2P') {
            onStart(selectedMode, null);
        }
    };

    const handleStart1P = () => {
        onStart('1P', difficulty);
    };

    if (!mode) {
        return (
            <div className="menu">
                <h1>XO Game</h1>
                <div className="menu-options">
                    <button onClick={() => handleModeSelect('1P')}>One Player</button>
                    <button onClick={() => handleModeSelect('2P')}>Two Players</button>
                </div>
            </div>
        );
    }

    if (mode === '1P') {
        return (
            <div className="menu">
                <h1>Select Difficulty</h1>
                <div className="difficulty-options">
                    {['Easy', 'Medium', 'Hard'].map((level) => (
                        <button
                            key={level}
                            className={difficulty === level ? 'selected' : ''}
                            onClick={() => onStart('1P', level)}
                        >
                            {level}
                        </button>
                    ))}
                </div>
                <button className="back-btn" onClick={() => setMode(null)}>Back</button>
            </div>
        );
    }

    return null;
};

export default Menu;
