export default class Game {
    constructor() {
        this.turn = "X";
        this.board = new Array(9).fill(null);
        this.prevIndex = null;

    }
    nextTurn() {
        this.turn = this.turn === "X" ? "O" : "X";

    }
    makeMove(i) {
        if (this.board[i]) {
            return;
        }
        
        if (!this.isInProgress()) {
            return;
        }
        
        this.board[i] = this.turn;
        this.prevIndex = i;
        if (!this.findWinningCombo()) {
            this.nextTurn();
        }

    }
    findWinningCombo() {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const combination of winningCombos) {
            const [a, b, c] = combination;

            if (this.board[a] && (this.board[a] === this.board[b] && this.board[a] === this.board[c])) {
                return combination;
            }

        }
        return null;
    }
    isInProgress() {
        return !this.findWinningCombo() && this.board.includes(null);
    }
}