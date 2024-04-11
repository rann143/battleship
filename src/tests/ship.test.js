/* eslint-disable no-undef */
import { Gameboard, Ship } from "../classes"

test("creates new ship with given length", () => {
    const gameboard = new Gameboard();
    expect(
        gameboard.placeShip(4)
    ).toBe(4);
})

// test("creates new ship with given length", () => {
//     const gameboard = new Gameboard();
//     gameboard.placeShip([[0, 1], [1, 1], [2, 1]])
//     expect(

//     ).toBe(4);
// })