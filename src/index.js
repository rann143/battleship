import { Ship, Player, Gameboard } from "./classes";
import GameController from "./gameloop";
import renderScreen from "./render_screen";


renderScreen();


const startGameBtn = document.querySelector('.start-button');
const gameContainer = document.querySelector('.game-container');
const playerBoard = document.querySelector('.player-board');
const cpuBoard = document.querySelector('.cpu-board');

startGameBtn.addEventListener('click', () => {
    while (playerBoard.firstChild) {
        playerBoard.removeChild(playerBoard.lastChild);
    }
    while (cpuBoard.firstChild) {
        cpuBoard.removeChild(cpuBoard.lastChild);
    }
    renderScreen();
});









