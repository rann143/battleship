import { Ship, Player, Gameboard } from "./classes";
import GameController from "./gameloop";

const title = document.createElement("h1");
title.textContent = "Hello There!";
title.classList.add("blur-back");

document.body.appendChild(title);

// const newBoard = new Gameboard();

// newBoard.placeShip([5, 4], 4);

// console.log(newBoard.receiveAttack(5, 6));
// console.log(newBoard.receiveAttack(5, 6));
// console.log(newBoard.receiveAttack(5, 4));
// console.log(newBoard.receiveAttack(6, 4));
// console.log(newBoard.receiveAttack(5, 5));
// console.log(newBoard.receiveAttack(5, 7));
// console.log(newBoard.numberOfShips);


// const player = new Player("dude");

// console.log(player.playTurn());
// console.log(player.playTurn());
// console.log(player.playTurn());
// console.log(player.playTurn());
// console.log(player.playTurn());
// console.log(player.playTurn());


const game = GameController();

console.log(game.getActivePlayer());
console.log(game.getBoardUnderAttack());

console.log(game.playRound(1, 1));

console.log(game.getActivePlayer());
console.log(game.getBoardUnderAttack());

console.log(game.playRound());

console.log(game.getActivePlayer());
console.log(game.getBoardUnderAttack());






