import React, { useState } from 'react';

const Menu = ({ onStart, onAdvancedToggle, isAdvanced = false }) => {
    const [mode, setMode] = useState(null);
    const [difficulty, setDifficulty] = useState('Medium');

    const handleAdvancedToggle = (checked) => {
        if (onAdvancedToggle) {
            onAdvancedToggle(checked);
        }
    };

    const handleModeSelect = (selectedMode) => {
        const finalMode = isAdvanced ? `${selectedMode}-ADV` : selectedMode;
        setMode(selectedMode);
        if (selectedMode === '2P') {
            onStart(finalMode, null);
        }
    };

    if (!mode) {
        return (
            <div className="menu">
                <h1>XO Game</h1>

                <div className="advanced-toggle">
                    <label className="toggle-label">
                        <input
                            type="checkbox"
                            checked={isAdvanced}
                            onChange={(e) => handleAdvancedToggle(e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                        <span className="toggle-text">Advanced Mode</span>
                    </label>
                </div>

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
                            onClick={() => {
                                const finalMode = isAdvanced ? '1P-ADV' : '1P';
                                onStart(finalMode, level);
                            }}
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
