import { checkWinner, getAvailableMoves } from './gameLogic';

const SCORES = {
    X: 10,
    O: -10,
    Draw: 0,
};

export const getBestMove = (board, aiPlayer, difficulty, isAdvancedMode = false, moveHistory = { X: [], O: [] }) => {
    const availableMoves = getAvailableMoves(board);
    if (availableMoves.length === 0) return -1;

    // Difficulty tuning via randomness
    let randomChance = 0;
    let depthLimit = Infinity;

    switch (difficulty) {
        case 'Easy':
            randomChance = 0.5;
            depthLimit = 1;
            break;
        case 'Medium':
            randomChance = 0.2;
            depthLimit = 3;
            break;
        case 'Hard':
            randomChance = 0;
            depthLimit = Infinity;
            break;
        default:
            randomChance = 0.2;
            depthLimit = 3;
    }

    // In advanced mode, limit depth even for Hard to prevent excessive computation
    // because the search space grows exponentially with piece removal/placement
    if (isAdvancedMode && depthLimit > 6) {
        depthLimit = 6;
    }

    // Apply randomness
    if (Math.random() < randomChance) {
        const randomIndex = Math.floor(Math.random() * availableMoves.length);
        return availableMoves[randomIndex];
    }

    // If it's the very first move of the game, pick center
    if (availableMoves.length === 9) return 4;
    if (availableMoves.length === 8 && board[4] === null) return 4;

    let bestScore = aiPlayer === 'X' ? -Infinity : Infinity;
    let move = availableMoves[0];

    // Shuffle available moves for variety
    for (let i = availableMoves.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [availableMoves[i], availableMoves[j]] = [availableMoves[j], availableMoves[i]];
    }

    for (let i = 0; i < availableMoves.length; i++) {
        const idx = availableMoves[i];

        // Simulate the move
        const newBoard = [...board];
        const newMoveHistory = {
            X: [...moveHistory.X],
            O: [...moveHistory.O]
        };

        // In advanced mode, remove oldest piece if player has 3
        if (isAdvancedMode && newMoveHistory[aiPlayer].length >= 3) {
            const oldestMove = newMoveHistory[aiPlayer].shift();
            newBoard[oldestMove] = null;
        }

        newBoard[idx] = aiPlayer;
        newMoveHistory[aiPlayer].push(idx);

        const score = minimax(
            newBoard,
            0,
            -Infinity,
            Infinity,
            aiPlayer === 'X' ? false : true,
            depthLimit,
            aiPlayer,
            isAdvancedMode,
            newMoveHistory
        );

        if (aiPlayer === 'X') {
            if (score > bestScore) {
                bestScore = score;
                move = idx;
            }
        } else {
            if (score < bestScore) {
                bestScore = score;
                move = idx;
            }
        }
    }

    return move;
};

const minimax = (board, depth, alpha, beta, isMaximizing, depthLimit, aiPlayer, isAdvancedMode = false, moveHistory = { X: [], O: [] }) => {
    const result = checkWinner(board);
    if (result) {
        if (result.winner === 'X') return 10 - depth;
        if (result.winner === 'O') return -10 + depth;
        if (result.winner === 'Draw') return 0;
    }

    if (depth >= depthLimit) {
        return 0;
    }

    const currentPlayer = isMaximizing ? 'X' : 'O';

    if (isMaximizing) {
        let bestScore = -Infinity;
        const moves = getAvailableMoves(board);

        for (let i = 0; i < moves.length; i++) {
            const idx = moves[i];

            const newBoard = [...board];
            const newMoveHistory = {
                X: [...moveHistory.X],
                O: [...moveHistory.O]
            };

            if (isAdvancedMode && newMoveHistory[currentPlayer].length >= 3) {
                const oldestMove = newMoveHistory[currentPlayer].shift();
                newBoard[oldestMove] = null;
            }

            newBoard[idx] = currentPlayer;
            newMoveHistory[currentPlayer].push(idx);

            const score = minimax(newBoard, depth + 1, alpha, beta, false, depthLimit, aiPlayer, isAdvancedMode, newMoveHistory);
            bestScore = Math.max(score, bestScore);
            alpha = Math.max(alpha, score);
            if (beta <= alpha) break;
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        const moves = getAvailableMoves(board);

        for (let i = 0; i < moves.length; i++) {
            const idx = moves[i];

            const newBoard = [...board];
            const newMoveHistory = {
                X: [...moveHistory.X],
                O: [...moveHistory.O]
            };

            if (isAdvancedMode && newMoveHistory[currentPlayer].length >= 3) {
                const oldestMove = newMoveHistory[currentPlayer].shift();
                newBoard[oldestMove] = null;
            }

            newBoard[idx] = currentPlayer;
            newMoveHistory[currentPlayer].push(idx);

            const score = minimax(newBoard, depth + 1, alpha, beta, true, depthLimit, aiPlayer, isAdvancedMode, newMoveHistory);
            bestScore = Math.min(score, bestScore);
            beta = Math.min(beta, score);
            if (beta <= alpha) break;
        }
        return bestScore;
    }
};
