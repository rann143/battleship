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

                cpuBoardDiv.appendChild(cpuCellBtn);
            })


        });
    }

    createCPUBoard();

})();

export default display;