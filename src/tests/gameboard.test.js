/* eslint-disable no-undef */
import { Gameboard, Ship } from "../classes"



test("adds missed attack to missedattacks", () => {
    const gameboard = new Gameboard();
    const expected = ['[5, 6]']
    expect(
        gameboard.receiveAttack(5, 6)
    ).toEqual(expect.arrayContaining(expected));
})

test("adds multiple missed attack to missedattacks", () => {
    const gameboard = new Gameboard();
    gameboard.receiveAttack(5, 6);
    gameboard.receiveAttack(1, 3);
    const expected = ['[5, 6]', '[1, 3]', '[4, 5]']
    expect(
        gameboard.receiveAttack(4, 5)
    ).toEqual(expect.arrayContaining(expected));
})

test("Wont allow attacks on previously attempted Coordinates", () => {
    const gameboard = new Gameboard();
    gameboard.receiveAttack(5, 6);
    gameboard.receiveAttack(4, 3);
    const expected = "Already Tried This Coordinate"
    expect(
        gameboard.receiveAttack(5, 6)
    ).toBe(expected);
})

test("returns attacked ship with updated hits/sunk", () => {
    const gameboard = new Gameboard();
    gameboard.placeShip([1, 1], 2);
    const expected = { length: 2, hits: 1, sunk: false };
    expect(
        gameboard.receiveAttack(1, 1)
    ).toEqual(expected);
})

test("returns attacked ship with updated hits/sunk (multiple hits)", () => {
    const gameboard = new Gameboard();
    gameboard.placeShip([1, 1], 3);
    gameboard.receiveAttack(1, 2);
    const expected = { length: 3, hits: 2, sunk: false };
    expect(
        gameboard.receiveAttack(1, 1)
    ).toEqual(expected);
})