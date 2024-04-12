/* eslint-disable no-plusplus */
import GameController from "./gameloop";

const display = (function ScreenController() {

    const game = GameController();
    const playerBoardDiv = document.querySelector('.player-board')
    const cpuBoardDiv = document.querySelector('.cpu-board');

    const createPlayerBoard = () => {
        const playerBoard = game.getBoard1();

        playerBoard.board.forEach((row, index0) => {
            
            row.forEach((cell, index) => {
                const playerCellBtn = document.createElement('button');
                playerCellBtn.classList.add('cell-button');

                playerCellBtn.dataset.row = index0;
                playerCellBtn.dataset.column = index;

                // Create a 'rowcol' data attribute thats a concatenated string of the cell's coordinates
                // Use this is displaying Ship locations on board
                const a = index0.toString();
                const b = index.toString();
                const result = a + b;
                playerCellBtn.dataset.rowcol = `a${result}`;

                playerBoardDiv.appendChild(playerCellBtn);
            })


        });
    }

    createPlayerBoard();

    const createCPUBoard = () => {
        const cpuBoard = game.getBoard2();

        cpuBoard.board.forEach((row, index0) => {
            
            row.forEach((cell, index) => {
                const cpuCellBtn = document.createElement('button');
                cpuCellBtn.classList.add('cell-button');

                cpuCellBtn.dataset.row = index0;
                cpuCellBtn.dataset.column = index;

                const a = index0.toString();
                const b = index.toString();
                const result = a + b;
                cpuCellBtn.dataset.rowcol = `b${result}`;

                cpuBoardDiv.appendChild(cpuCellBtn);
            })


        });
    }

    createCPUBoard();

    const displayPlayerShips = () => {
        const playerBoard = game.getBoard1().board;
        const shipLocations = [];

        // Create a new array of filtered coordinates that only contains coordinates occupied by ships
        for (let i = 0; i < playerBoard.length; i++) {
            for (let j = 0; j < playerBoard.length; j++) {
                if (playerBoard[i][j] !== null) {
                    shipLocations.push([i, j]);
                }
            }
        }

        // Add a different background color for each cell that contains a ship 
        shipLocations.forEach((coordinate) => {
            const cell = document.querySelector(`[data-rowcol='a${coordinate[0]}${coordinate[1]}']`);
            cell.classList.add('ship');
        })

    }

    displayPlayerShips();

    const displayCPUShips = () => {
        const cpuBoard = game.getBoard2().board;
        const shipLocations = [];

        // Create a new array of filtered coordinates that only contains coordinates occupied by ships
        for (let i = 0; i < cpuBoard.length; i++) {
            for (let j = 0; j < cpuBoard.length; j++) {
                if (cpuBoard[i][j] !== null) {
                    shipLocations.push([i, j]);
                }
            }
        }

        // Add a different background color for each cell that contains a ship 
        shipLocations.forEach((coordinate) => {
            const cell = document.querySelector(`[data-rowcol='b${coordinate[0]}${coordinate[1]}']`);
            cell.classList.add('ship');
        })

    }

    displayCPUShips();


})();

export default display;