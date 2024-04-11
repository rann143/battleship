import { Ship, Player, Gameboard } from "./classes";

const title = document.createElement("h1");
title.textContent = "Hello There!";
title.classList.add("blur-back");

document.body.appendChild(title);

const newBoard = new Gameboard();


console.log(newBoard.placeShip([0, 2], 5, false));

console.log(newBoard.placeShip([3, 0], 4));

console.log(newBoard.placeShip([11, 8], 4));


console.log(newBoard.board);
