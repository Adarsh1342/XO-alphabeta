import React from 'react';
import Square from './Square';

const Board = ({ squares, onClick, winningLine }) => {
    const renderSquare = (i) => {
        return (
            <Square
                key={i}
                value={squares[i]}
                onClick={() => onClick(i)}
                isWinningSquare={winningLine && winningLine.includes(i)}
            />
        );
    };

    return (
        <div className="board">
            {squares.map((_, i) => renderSquare(i))}
        </div>
    );
};

export default Board;
