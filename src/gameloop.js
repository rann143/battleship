import { Ship, Player, Gameboard } from "./classes";

function GameController(
    player1 = new Player("You"),
    player2 = new Player("CPU"),
    gameBoard1 = new Gameboard(),
    gameBoard2 = new Gameboard(),
) {
    // Set Up Boards Using predetermined Coordinates (For Now);
    gameBoard1.placeShip([1, 1], 3);
    gameBoard1.placeShip([0, 5], 5, false);
    gameBoard1.placeShip([7, 7], 3);
    gameBoard1.placeShip([5, 1], 4, false);
    gameBoard1.placeShip([10, 8], 2);

    gameBoard2.placeShip([1, 1], 3);
    gameBoard2.placeShip([0, 5], 5, false);
    gameBoard2.placeShip([7, 7], 3);
    gameBoard2.placeShip([5, 1], 4, false);
    gameBoard2.placeShip([10, 8], 2);
    
    // Active player
    let activePlayer = player1;

    function switchPlayer() {
        activePlayer = activePlayer === player1 ? player2 : player1;
    }

    const getActivePlayer = () => activePlayer;

    // Current board under attack by the active player
    // Might not need this.
    let boardUnderAttack = gameBoard2;

    function switchBoardUnderAttack() {
        boardUnderAttack = boardUnderAttack === gameBoard2 ? gameBoard1 : gameBoard2;
    }

    const getBoardUnderAttack = () => boardUnderAttack;

    // Checking if a player has won
    function hasWon() {
        if (getBoardUnderAttack().areAllShipsSunk()) return true;

        return false;
    }

    // functionality for playing a round
    function playRound(x, y) {

        if (getActivePlayer() === player1) {
            gameBoard2.receiveAttack(x, y);
        }

        if (getActivePlayer() === player2) {
            const shotCoordinatesArray = player2.takeShotCPU();
            gameBoard1.receiveAttack(shotCoordinatesArray[0], shotCoordinatesArray[1]);
        }

        if (hasWon() === true) {
            alert(`${getActivePlayer().name} has won!`);
            // Think about what needs to happen when a game ends
            return "Game has ended";
        }

        switchPlayer();
        switchBoardUnderAttack();

    }

    function printNewGame() {

    }


    return {
        playRound,
        switchPlayer,
        getActivePlayer,
        switchBoardUnderAttack,
        getBoardUnderAttack
    }

}

export default GameController;