import { Ship, Player, Gameboard } from "./classes";

function GameController(
    player1 = new Player("You"),
    player2 = new Player("CPU"),
    gameBoard1 = new Gameboard(),
    gameBoard2 = new Gameboard(),
) {
    // Active player
    let activePlayer = player1;

    function switchPlayer() {
        activePlayer = activePlayer === player1 ? player2 : player1;
    }

    const getActivePlayer = () => activePlayer;

    // Current board under attack by the active player
    let boardUnderAttack = gameBoard2;

    function switchBoardUnderAttack() {
        boardUnderAttack = boardUnderAttack === gameBoard2 ? gameBoard1 : gameBoard2;
    }

    const getBoardUnderAttack = () => boardUnderAttack;

    // functionality for playing a round
    function playRound() {

    }

    return {
        switchPlayer,
        getActivePlayer,
        switchBoardUnderAttack,
        getBoardUnderAttack
    }

}