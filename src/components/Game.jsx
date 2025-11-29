import React, { useState, useEffect } from 'react';
import Board from './Board';
import PlayerControls from './PlayerControls';
import { checkWinner, getAvailableMoves } from '../utils/gameLogic';
import { getBestMove } from '../utils/ai';

const Game = ({ mode, difficulty, onBack }) => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [userPlayer, setUserPlayer] = useState('X');
    const [winner, setWinner] = useState(null);
    const [winningLine, setWinningLine] = useState(null);
    const [gameStarted, setGameStarted] = useState(false);

    // For advanced mode: track move history for each player
    const [moveHistory, setMoveHistory] = useState({ X: [], O: [] });

    const isAdvancedMode = mode === '1P-ADV' || mode === '2P-ADV';
    const is1PMode = mode === '1P' || mode === '1P-ADV';

    // Reset game
    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setCurrentPlayer('X');
        setUserPlayer('X');
        setWinner(null);
        setWinningLine(null);
        setGameStarted(false);
        setMoveHistory({ X: [], O: [] });
    };

    // Handle click
    const handleClick = (i) => {
        if (winner || board[i]) return;

        // In 1P mode, prevent click if it's AI's turn
        if (is1PMode && currentPlayer !== userPlayer) return;

        makeMove(i);
    };

    const makeMove = (i) => {
        const newBoard = [...board];
        const newMoveHistory = {
            X: [...moveHistory.X],
            O: [...moveHistory.O]
        };

        // In advanced mode, if player already has 3 pieces, remove the oldest
        if (isAdvancedMode && newMoveHistory[currentPlayer].length >= 3) {
            const oldestMove = newMoveHistory[currentPlayer].shift();
            newBoard[oldestMove] = null;
        }

        // Place new move
        newBoard[i] = currentPlayer;
        newMoveHistory[currentPlayer].push(i);

        setBoard(newBoard);
        setMoveHistory(newMoveHistory);
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
        if (is1PMode && !winner && currentPlayer !== userPlayer) {
            const timer = setTimeout(() => {
                const move = getBestMove(board, currentPlayer, difficulty, isAdvancedMode, moveHistory);
                if (move !== -1) {
                    makeMove(move);
                }
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [currentPlayer, winner, is1PMode, userPlayer, board, difficulty]);

    // Handle player selection in 1P mode before game starts
    const handleSelectPlayer = (player) => {
        if (!gameStarted) {
            setUserPlayer(player);
        }
    };

    return (
        <div className="game-container">
            <div className="header">
                <button className="back-btn-small" onClick={onBack}>Menu</button>
                <div className="status">
                    {isAdvancedMode && <div className="mode-badge">Advanced Mode</div>}
                    {winner ? (
                        winner === 'Draw' ? "It's a Draw!" : (
                            is1PMode ? (
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
