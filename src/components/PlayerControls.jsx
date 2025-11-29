import React from 'react';

const PlayerControls = ({ currentPlayer, onSelectPlayer, gameStarted, mode }) => {
    return (
        <div className="player-controls">
            <button
                className={`player-btn x-btn ${currentPlayer === 'X' ? 'active' : ''}`}
                onClick={() => !gameStarted && mode === '1P' && onSelectPlayer('X')}
                disabled={gameStarted || mode === '2P'}
            >
                X
            </button>
            <div className="vs">VS</div>
            <button
                className={`player-btn o-btn ${currentPlayer === 'O' ? 'active' : ''}`}
                onClick={() => !gameStarted && mode === '1P' && onSelectPlayer('O')}
                disabled={gameStarted || mode === '2P'}
            >
                O
            </button>
        </div>
    );
};

export default PlayerControls;
