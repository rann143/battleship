/* eslint-disable no-undef */
import { Gameboard } from "../classes"



test("checks if board coordinates are null", () => {
    const gameboard = new Gameboard();
    expect(
        gameboard.receiveAttack(1, 3)
    ).toBeFalsy();
})

test("checks if board coordinates are null", () => {
    const gameboard = new Gameboard();
    gameboard.board[5][6] = "x";
    expect(
        gameboard.receiveAttack(5, 6)
    ).toBeTruthy();
})