export default class GameView {
  constructor(root) {
    this.root = root;
    this.root.innerHTML = `
        <div class="header">
            <div class = "header__turn"></div>
            <button type = "button" class = "header__restore">
                <i class = "material-icons">restore</i>
                restore move
            </button>
            <div class = "header__status"></div>
            <button type = "button" class = "header__restart">
                <i class = "material-icons">refresh</i>
            </button>
            
        </div>
        <div class="board">
                <div class ="board__tile" data-index="0"></div>
                <div class ="board__tile" data-index="1"></div>
                <div class ="board__tile" data-index="2"></div>
                <div class ="board__tile" data-index="3"></div>
                <div class ="board__tile" data-index="4"></div>
                <div class ="board__tile" data-index="5"></div>
                <div class ="board__tile" data-index="6"></div>
                <div class ="board__tile" data-index="7"></div>
                <div class ="board__tile" data-index="8"></div>
        </div>

        <div class="jest">
            <button type = "button" class="jest__button">
                I'm gonna win!
                </button>
        </div> 
        
        `;
    this.onTileClick = undefined;
    this.onRestartClick = undefined;
    this.onWinButtonClick = undefined;
    this.onRestoreClick = undefined;

    this.root.querySelector(".header__restore")
    .addEventListener("click", () => {
        if(this.onRestoreClick){
            this.onRestoreClick();
        }
    });

    this.root.querySelector(".jest__button").addEventListener("click", () => {
      if (this.onWinButtonClick) {
        this.onWinButtonClick();
      }
    });

    this.root.querySelectorAll(".board__tile").forEach((tile) => {
      tile.addEventListener("click", () => {
        if (this.onTileClick) {
          this.onTileClick(tile.dataset.index);
        }
      });
    });

    this.root
      .querySelector(".header__restart")
      .addEventListener("click", () => {
        if (this.onRestartClick) {
          this.onRestartClick();
        }
      });
  }

  update(game) {
    this.updateTurn(game);
    this.updateBoard(game);
    this.updateStatus(game);

  }

  updateStatus(game) {
    let status = "In Progress";

    if (game.findWinningCombo()) {
      status = `${game.turn} is the winner!`;
    } else if (!game.isInProgress()) {
      status = "It's a tie!";
    }

    this.root.querySelector(".header__status").textContent = status;
  }

  updateTurn(game) {
    this.root.querySelector(
      ".header__turn"
    ).textContent = `${game.turn}'s turn`;
  }

  updateBoard(game) {
    const winningCombo = game.findWinningCombo();
    for (let i = 0; i < game.board.length; i++) {
      const tile = this.root.querySelector(`.board__tile[data-index = "${i}"]`);

      tile.classList.remove("board__tile--winner");
      tile.textContent = game.board[i];

      if (winningCombo && winningCombo.includes(i)) {
        tile.classList.add("board__tile--winner");
      }
    }
  }
  updateMessage(game) {
    this.root.querySelector(`.jest__button`).textContent =
      game.turn + " thinks they will win!";
  }
}

