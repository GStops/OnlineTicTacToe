import Game from "./Game.js";
import GameView from "./GameView.js";
let game = new Game();

let gameView = new GameView(document.getElementById("app"));

//define functions
gameView.onTileClick = function(i){
    game.makeMove(i);
    gameView.update(game);
};
gameView.onRestartClick = function(){
    game = new Game();
    gameView.update(game);
};
gameView.onWinButtonClick = function(){
    gameView.updateMessage(game);
}
gameView.onRestoreClick = function (){
    if(game.isInProgress() && !(game.board[game.prevIndex] === null)){
    game.board[game.prevIndex] = null;
    game.nextTurn();
    gameView.update(game);
}
}

gameView.update(game);
