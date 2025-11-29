import React, { useState, useEffect } from 'react';
import Board from './Board';
import PlayerControls from './PlayerControls';
import { checkWinner, getAvailableMoves } from '../utils/gameLogic';
import { getBestMove } from '../utils/ai';

const Game = ({ mode, difficulty, onBack }) => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState('X'); // 'X' always starts first in game logic
    const [userPlayer, setUserPlayer] = useState('X'); // In 1P, user can choose X or O
    const [winner, setWinner] = useState(null); // 'X', 'O', 'Draw', or null
    const [winningLine, setWinningLine] = useState(null);
    const [gameStarted, setGameStarted] = useState(false);

    // Reset game
    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setCurrentPlayer('X');
        setUserPlayer('X'); // Reset user preference so they can choose again
        setWinner(null);
        setWinningLine(null);
        setGameStarted(false);
    };

    // Handle click
    const handleClick = (i) => {
        if (winner || board[i]) return;

        // In 1P mode, prevent click if it's AI's turn
        if (mode === '1P' && currentPlayer !== userPlayer) return;

        makeMove(i);
    };

    const makeMove = (i) => {
        const newBoard = [...board];
        newBoard[i] = currentPlayer;
        setBoard(newBoard);
        setGameStarted(true);

        const result = checkWinner(newBoard);
        if (result) {
            setWinner(result.winner);
            setWinningLine(result.line);
        } else {
            setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        }
    };

    // AI Turn
    useEffect(() => {
        if (mode === '1P' && !winner && currentPlayer !== userPlayer) {
            // AI's turn
            const timer = setTimeout(() => {
                const move = getBestMove(board, currentPlayer, difficulty);
                if (move !== -1) {
                    makeMove(move);
                }
            }, 500); // Delay for realism
            return () => clearTimeout(timer);
        }
    }, [currentPlayer, winner, mode, userPlayer, board, difficulty]);

    // Handle player selection in 1P mode before game starts
    const handleSelectPlayer = (player) => {
        if (!gameStarted) {
            setUserPlayer(player);
            // If user chooses O, X (AI) must start. 
            // Current player is already X. AI effect will trigger because currentPlayer (X) !== userPlayer (O).
        }
    };

    return (
        <div className="game-container">
            <div className="header">
                <button className="back-btn-small" onClick={onBack}>Menu</button>
                <div className="status">
                    {winner ? (
                        winner === 'Draw' ? "It's a Draw!" : (
                            mode === '1P' ? (
                                winner === userPlayer ? "User Wins!" : "AI Wins!"
                            ) : (
                                `Winner: ${winner}`
                            )
                        )
                    ) : (
                        `Turn: ${currentPlayer}`
                    )}
                </div>
            </div>

            <PlayerControls
                currentPlayer={currentPlayer}
                onSelectPlayer={handleSelectPlayer}
                gameStarted={gameStarted}
                mode={mode}
            />

            <Board squares={board} onClick={handleClick} winningLine={winningLine} />

            <button className="reset-btn" onClick={resetGame}>Restart Game</button>
        </div>
    );
};

export default Game;
