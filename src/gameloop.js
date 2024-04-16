/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import { Ship, Player, Gameboard } from "./classes";

function GameController(
    player1 = new Player("Me"),
    player2 = new Player("CPU"),
    gameBoard1 = new Gameboard("My Board"),
    gameBoard2 = new Gameboard("CPU Board"),
) {


    function filterAvailablePlacements(array, shipLength, horizontal = true) {
        const availablePlacements = [];
        if (horizontal === true) {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j <= (9 - shipLength + 1); j++) {
                // Issue where available coordinates will include spots where ships cannot
                // be placed due to other ships in their way. I.E, if a new ship is a length of 5
                // and horizontal, it will not be placed if there is an existing ships 3 cells away.
                // While I account for the existing ships location, available moves should not include
                // null spaces that are too close given a new ship's length.
                // This code: ...&& array[i][j + 1] === null && array[i][j + 2] === null
                // Is meant as a buffer to address this but clearly is not a perfect solution.
                // Same issue for vertical ships
                if (array[i][j] === null
                    && array[i][j + 1] === null
                    && array[i][j + 2] === null
                ) {
                    availablePlacements.push([i, j])
                }
                
            }
            }
        }
        if (horizontal === false) {
        for (let i = 0; i <= (9 - shipLength + 1); i++) {
            for (let j = 0; j < array.length; j++) {
                if (array[i][j] === null
                    && array[i + 1][j] === null
                    && array[i + 2][j] === null
                ) {
                    availablePlacements.push([i, j])
                }
                
            }
            }
        }

        return availablePlacements;
    }

    function placePlayerShipRandomly(shipLength, horizontal = true) {
        const shipAvailability = filterAvailablePlacements(gameBoard1.board, shipLength, horizontal)
        const randomCoord2 = shipAvailability[Math.floor(Math.random() * shipAvailability.length)];
        gameBoard1.placeShip(randomCoord2, shipLength, horizontal);

        console.log(gameBoard1.board)
        console.log(gameBoard1.ships)

        return gameBoard1.board;
    }
    function placeCPUShipRandomly(shipLength, horizontal = true) {
        const shipAvailability = filterAvailablePlacements(gameBoard2.board, shipLength, horizontal)
        const randomCoord = shipAvailability[Math.floor(Math.random() * shipAvailability.length)];
        gameBoard2.placeShip(randomCoord, shipLength, horizontal);

        console.log(gameBoard2.board)
        console.log(gameBoard2.ships)

        return gameBoard2.board;
    }

    
    // Set Up Boards Using predetermined Coordinates (For Now);
    function setDraftBoard() {
        placePlayerShipRandomly(5, false);
        placePlayerShipRandomly(4);
        placePlayerShipRandomly(2);
        placePlayerShipRandomly(3, false);


        placeCPUShipRandomly(5, false);
        placeCPUShipRandomly(4);
        placeCPUShipRandomly(2);
        placeCPUShipRandomly(3, false);

        // Due to issue with filterAvailablePlacements() function, this is a temporary way to 
        // reset the boards and re-place the ships if there are less than 4 ships on either board
        if (gameBoard1.ships.length !== 4 || gameBoard2.ships.length !== 4) {
            gameBoard1 = new Gameboard();
            gameBoard2 = new Gameboard();

            placePlayerShipRandomly(5, false);
            placePlayerShipRandomly(4);
            placePlayerShipRandomly(2);
            placePlayerShipRandomly(3, false);


            placeCPUShipRandomly(5, false);
            placeCPUShipRandomly(4);
            placeCPUShipRandomly(2);
            placeCPUShipRandomly(3, false);
        }
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