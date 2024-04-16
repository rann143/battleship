/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
import { Gameboard, Ship } from "../classes"
import renderScreen from "../render_screen"

function filterAvailablePlacements(array, shipLength, horizontal = true) {
        const availableMoves = [];

        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length; j++) {
                if (array[i][j] === null && horizontal === true && j <= (9 - shipLength + 1)) {
                    availableMoves.push([i, j])
                } else if (array[i][j] === null && horizontal === false && i <= (9 - shipLength + 1)) {
                    availableMoves.push([i, j])
                }
                
            }
        }
    
    return availableMoves;
    }

test("gives available placements (horizontal orientation", () => {
    const board = new Gameboard();
    expect(
        filterAvailablePlacements(board.board, 10)
    ).toEqual([[0,0], [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0], [8,0], [9,0]])
})

test("gives available placements (vertical orientation", () => {
    const board = new Gameboard();
    expect(
        filterAvailablePlacements(board.board, 10, false)
    ).toEqual([[0,0], [0,1], [0,2], [0,3], [0,4], [0,5], [0,6], [0,7], [0,8], [0,9]])
})