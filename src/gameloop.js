import { Ship, Player, Gameboard } from "./classes";

function GameController(
    player1 = new Player("Me"),
    player2 = new Player("CPU"),
    gameBoard1 = new Gameboard("My Board"),
    gameBoard2 = new Gameboard("CPU Board"),
) {
    
    // Set Up Boards Using predetermined Coordinates (For Now);
    function setDraftBoard() {
        gameBoard1.placeShip([0, 1], 3);
        gameBoard1.placeShip([2, 5], 5, false);
        gameBoard1.placeShip([5, 0], 4);
        gameBoard1.placeShip([8, 8], 2);

        gameBoard2.placeShip([3, 1], 4, false);
        gameBoard2.placeShip([1, 4], 3);
        gameBoard2.placeShip([6, 8], 3, false);
        gameBoard2.placeShip([5, 5], 2);
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
        getBoard1().board = getBoard1().buildBoard();
        getBoard2().board = getBoard2().buildBoard();
        
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
            return gameBoard2.receiveAttack(x, y);
        }

        if (getActivePlayer() === player2) {
            const shotCoordinatesArray = player2.takeShotCPU();
            gameBoard1.receiveAttack(shotCoordinatesArray[0], shotCoordinatesArray[1]);
            console.log(shotCoordinatesArray);
            // Return the shot coordinates of the CPU's shot. 
            // These coordinates are used the mark the location on the display if hit
            // There's probably a better way to go about this but can come back later
            return shotCoordinatesArray;
        }

        // if (hasWon() === true) {
        //     console.log(`${getActivePlayer().name} has won!`);
        //     console.log(getBoardUnderAttack().ships);
        //     // Think about what needs to happen when a game ends
        //     // Reset Players & Board
        //     printNewGame();
        //     setDraftBoard();
        //     return "Game has ended";
        // }

        // switchPlayer(); -> THIS is now happening in ClickHandler() in render_screen.js
        switchBoardUnderAttack();

    }

    return {
        printNewGame,
        setDraftBoard,
        playRound,
        switchPlayer,
        getActivePlayer,
        getPlayer1,
        getPlayer2,
        switchBoardUnderAttack,
        getBoardUnderAttack,
        getBoard1,
        getBoard2,
        hasWon
    }

}

export default GameController;