import React from 'react';

const PlayerControls = ({ currentPlayer, onSelectPlayer, gameStarted, mode }) => {
    const is1PMode = mode === '1P' || mode === '1P-ADV';
    const is2PMode = mode === '2P' || mode === '2P-ADV';

    return (
        <div className="player-controls">
            <button
                className={`player-btn x-btn ${currentPlayer === 'X' ? 'active' : ''}`}
                onClick={() => !gameStarted && is1PMode && onSelectPlayer('X')}
                disabled={gameStarted || is2PMode}
            >
                X
            </button>
            <div className="vs">VS</div>
            <button
                className={`player-btn o-btn ${currentPlayer === 'O' ? 'active' : ''}`}
                onClick={() => !gameStarted && is1PMode && onSelectPlayer('O')}
                disabled={gameStarted || is2PMode}
            >
                O
            </button>
        </div>
    );
};

export default PlayerControls;
