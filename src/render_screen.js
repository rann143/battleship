/* eslint-disable no-alert */
/* eslint-disable no-plusplus */
import GameController from "./gameloop";
import { Ship, Gameboard, Player } from './classes'

function renderScreen() {

    let game = GameController();
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

    const showMissOnCPUBoard = () => {
        const cpuMissedAttacks = game.getBoard2().missedAttacks;

        cpuMissedAttacks.forEach(coordinate => {
            const cell = document.querySelector(`[data-rowcol='b${coordinate[0]}${coordinate[1]}']`);
            cell.classList.add('missed');
        })
    }

    function showHitOnCPUBoard(x,y) {
        const cpuBoard = game.getBoard2().board;
        const cell = document.querySelector(`[data-rowcol='b${x}${y}']`);

        if (cpuBoard[x][y] !== null) {
            cell.classList.add('hit');
        }
        
    }

    function showHitOnPlayerBoard(x,y) {
        const playerBoard = game.getBoard1().board;
        const cell = document.querySelector(`[data-rowcol='a${x}${y}']`);

        if (playerBoard[x][y] !== null) {
            cell.classList.add('hit');
        }
    }

    const showMissOnPlayerBoard = () => {
        const playerMissedAttacks = game.getBoard1().missedAttacks;

        playerMissedAttacks.forEach(coordinate => {
            const cell = document.querySelector(`[data-rowcol='a${coordinate[0]}${coordinate[1]}']`);
            cell.classList.add('missed');
        })
    }

    createPlayerBoard();
    createCPUBoard();
    displayPlayerShips();
    displayCPUShips();

    const cells = document.querySelectorAll('.cell-button');

    // Use in async function in ClickHandler so CPU takes time 
    // before shooting
    function wait(ms) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(ms)
            }, ms )
        })
    }  

    function clickHandler(e) {
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;

        if (!selectedRow || !selectedColumn) return;

        // Human Player takes shot
        game.playRound(selectedRow, selectedColumn);
        showHitOnCPUBoard(selectedRow, selectedColumn);
        showMissOnCPUBoard();
        if (game.hasWon() === true) {
            alert("YOU WIN")
            // Reset for a new round by reassigning 'game' to a new instance of GameController
            game = GameController();
            cells.forEach(cell => {
                cell.classList.remove('hit');
                cell.classList.remove('missed');
                cell.classList.remove('ship');
            })
            displayPlayerShips();
            displayCPUShips();
            return;
        }
        // Active Player switches to CPU which takes a shot
        game.switchPlayer();

        // Wait 1 second before CPU takes shot
        (async () => {
            await wait(500);
            // When cpu shoots, the coordinates of the shot are returned in playRound()
            const cpuShot = game.playRound();
            showHitOnPlayerBoard(cpuShot[0], cpuShot[1]);
            showMissOnPlayerBoard();
            if (game.hasWon() === true) {
                alert("LOSER");
                game = GameController();
                cells.forEach(cell => {
                    cell.classList.remove('hit');
                    cell.classList.remove('missed');
                })
                return;
            }
            // Switch Active Player back to Human
            game.switchPlayer();
        })();
    }
    
    cells.forEach(cell => {
        cell.addEventListener('click', clickHandler);
    })


};

export default renderScreen;