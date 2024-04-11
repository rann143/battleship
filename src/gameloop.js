import { Ship, Player, Gameboard } from "./classes";

function GameController(
    player1 = new Player("You"),
    player2 = new Player("CPU"),
    gameBoard1 = new Gameboard(),
    gameBoard2 = new Gameboard(),
) {

    let activePlayer = player1;

    function switchPlayer() {
        activePlayer = activePlayer === player1 ? player2 : player1;
    }

    const getActivePlayer = () => activePlayer;

    let boardUnderAttack = gameBoard2;

    function switchActiveEnemyBoard() {
        boardUnderAttack = boardUnderAttack === gameBoard2 ? gameBoard1 : gameBoard2;
    }

    const getBoardUnderAttack = () => boardUnderAttack;

    function playRound() {
        
    }

}