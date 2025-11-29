import React from 'react';

const Square = ({ value, onClick, isWinningSquare }) => {
    return (
        <button
            className={`square ${value ? value.toLowerCase() : ''} ${isWinningSquare ? 'winning' : ''}`}
            onClick={onClick}
        >
            {value}
        </button>
    );
};

export default Square;
