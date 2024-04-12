import { Ship, Player, Gameboard } from "./classes";

function GameController(
    player1 = new Player("Me"),
    player2 = new Player("CPU"),
    gameBoard1 = new Gameboard("My Board"),
    gameBoard2 = new Gameboard("CPU Board"),
) {
    
    // Set Up Boards Using predetermined Coordinates (For Now);
    function setDraftBoard() {
        gameBoard1.placeShip([1, 1], 1);
        gameBoard1.placeShip([0, 5], 1);

        gameBoard2.placeShip([1, 1], 1);
        gameBoard2.placeShip([0, 5], 1);
    }
    setDraftBoard();
    
    // Active player
    let activePlayer = player1;


    function switchPlayer() {
        activePlayer = activePlayer === player1 ? player2 : player1;
    }

    const getActivePlayer = () => activePlayer;
    const getPlayer1 = () => player1;
    const getPlayer2 = () => player2;

    // Current board under attack by the active player
    let boardUnderAttack = gameBoard2;

    function switchBoardUnderAttack() {
        boardUnderAttack = boardUnderAttack === gameBoard2 ? gameBoard1 : gameBoard2;
    }

    const getBoardUnderAttack = () => boardUnderAttack;
    const getBoard1 = () => gameBoard1;
    const getBoard2 = () => gameBoard2;


    function printNewGame() {
        console.log('resetting game');
        getPlayer1().resetPlayer();
        getPlayer2().resetPlayer();
        getBoard1().resetBoard();
        getBoard2().resetBoard();
        
    }

    // Checking if a player has won
    function hasWon() {
        if (getBoardUnderAttack().areAllShipsSunk()) return true;

        return false;
    }

    // functionality for playing a round
    // eslint-disable-next-line consistent-return
    function playRound(x, y) {

        if (getActivePlayer() === player1) {
            gameBoard2.receiveAttack(x, y);
        }

        if (getActivePlayer() === player2) {
            const shotCoordinatesArray = player2.takeShotCPU();
            gameBoard1.receiveAttack(shotCoordinatesArray[0], shotCoordinatesArray[1]);
        }

        if (hasWon() === true) {
            console.log(`${getActivePlayer().name} has won!`);
            console.log(getBoardUnderAttack().ships);
            // Think about what needs to happen when a game ends
            // Reset Players & Board
            printNewGame();
            setDraftBoard();
            return "Game has ended";
        }

        switchPlayer();
        switchBoardUnderAttack();

    }



    return {
        printNewGame,
        playRound,
        switchPlayer,
        getActivePlayer,
        getPlayer1,
        getPlayer2,
        switchBoardUnderAttack,
        getBoardUnderAttack,
        getBoard1,
        getBoard2
    }

}

export default GameController;