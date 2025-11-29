import { checkWinner, getAvailableMoves } from './gameLogic';

const SCORES = {
    X: 10,
    O: -10,
    Draw: 0,
};

export const getBestMove = (board, aiPlayer, difficulty) => {
    const availableMoves = getAvailableMoves(board);
    if (availableMoves.length === 0) return -1;

    // Difficulty tuning via randomness
    // Easy: 50% chance of random move
    // Medium: 20% chance of random move
    // Hard: 0% chance (Perfect play)
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

    // Apply randomness
    if (Math.random() < randomChance) {
        const randomIndex = Math.floor(Math.random() * availableMoves.length);
        return availableMoves[randomIndex];
    }

    // If it's the very first move of the game, pick center or random corner to save computation
    if (availableMoves.length === 9) return 4; // Center
    if (availableMoves.length === 8 && board[4] === null) return 4; // Take center if available

    let bestScore = aiPlayer === 'X' ? -Infinity : Infinity;
    let move = availableMoves[0]; // Default to first available

    // Shuffle available moves to add variety when scores are equal
    for (let i = availableMoves.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [availableMoves[i], availableMoves[j]] = [availableMoves[j], availableMoves[i]];
    }

    for (let i = 0; i < availableMoves.length; i++) {
        const idx = availableMoves[i];
        board[idx] = aiPlayer;
        const score = minimax(board, 0, -Infinity, Infinity, aiPlayer === 'X' ? false : true, depthLimit, aiPlayer);
        board[idx] = null;

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

const minimax = (board, depth, alpha, beta, isMaximizing, depthLimit, aiPlayer) => {
    const result = checkWinner(board);
    if (result) {
        if (result.winner === 'X') return 10 - depth;
        if (result.winner === 'O') return -10 + depth;
        if (result.winner === 'Draw') return 0;
    }

    if (depth >= depthLimit) {
        return 0; // Heuristic value
    }

    if (isMaximizing) { // X's turn
        let bestScore = -Infinity;
        const moves = getAvailableMoves(board);
        for (let i = 0; i < moves.length; i++) {
            const idx = moves[i];
            board[idx] = 'X';
            const score = minimax(board, depth + 1, alpha, beta, false, depthLimit, aiPlayer);
            board[idx] = null;
            bestScore = Math.max(score, bestScore);
            alpha = Math.max(alpha, score);
            if (beta <= alpha) break;
        }
        return bestScore;
    } else { // O's turn
        let bestScore = Infinity;
        const moves = getAvailableMoves(board);
        for (let i = 0; i < moves.length; i++) {
            const idx = moves[i];
            board[idx] = 'O';
            const score = minimax(board, depth + 1, alpha, beta, true, depthLimit, aiPlayer);
            board[idx] = null;
            bestScore = Math.min(score, bestScore);
            beta = Math.min(beta, score);
            if (beta <= alpha) break;
        }
        return bestScore;
    }
};
