/* eslint-disable prefer-destructuring */
/* eslint-disable no-sequences */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-classes-per-file */
class Ship {

    constructor(length, hits = 0, sunk = false) {
        this.length = length,
        this.hits = hits,
        this.sunk = sunk
    }


    hit() {
        this.hits++;
        return this.hits;
    }

    isSunk() {
        if (this.hits === this.length) {
            this.sunk = true
            return this.sunk;
        }

        return this.sunk;
    }

}

class Gameboard {

    constructor(missedAttacks = [], numberOfShips = 10) {
        this.missedAttacks = missedAttacks,
        this.numberOfShips = numberOfShips
        this.board = this.buildBoard();
    }

    placeShip(coordinate, length, horizontal = true) { 
        const ship = new Ship(length);

        // What to protect against:
        // cells not on the board

        if (horizontal === true) {
            let yCoor = coordinate[1];
            
            // Iterates through each cell to see if off the board
            for (let i = 0; i < length; i++) {
                if (this.isOnBoard([coordinate[0], yCoor]) === false) {
                    return `Can't Reach [${coordinate[0]}, ${yCoor}]: not on board`;
                }
                yCoor++;
            }

            // Reset yCoor to initial value
            yCoor = coordinate[1];
            // Iterates through each cell to see if empty
            for (let i = 0; i < length; i++) {
                if (this.isEmpty([coordinate[0], yCoor]) === false) {
                    return `A Ship Is Already At [${coordinate[0]}, ${yCoor}]`;
                }
                yCoor++;
            }
            
            // Reset yCoor to initial value
            yCoor = coordinate[1];
            // If all cells are empty, fill cells with reference to the ship
            for (let i = 0; i < length; i++) {
                this.board[coordinate[0]][yCoor] = ship;
                yCoor++;
            }
        }

        if (horizontal === false) {
            let xCoor = coordinate[0];

            // Iterates through each cell to see if off the board
            for (let i = 0; i < length; i++) {
                if (this.isOnBoard([xCoor, coordinate[1]]) === false) {
                    return `Can't Reach [${xCoor}, ${coordinate[1]}]: not on board`;
                }
                xCoor++;
            }

            // Reset xCoor to initial value
            xCoor = coordinate[0];
            // Iterates through each cell to see if empty
            for (let i = 0; i < length; i++) {
                if (this.isEmpty([xCoor, coordinate[1]]) === false) {
                    return `A Ship Is Already At [${xCoor}, ${coordinate[1]}]`;
                }
                xCoor++;
            }

            // Reset xCoor to initial value
            xCoor = coordinate[0];
            // If all cells are empty, fill cells with reference to the ship
            for (let i = 0; i < length; i++) {
                this.board[xCoor][coordinate[1]] = ship;
                xCoor++;
            }
        }

        return this.board;

    }

    receiveAttack(x,y) {

        if (this.board[x][y] !== null) {
            this.missedAttacks.push([x, y]);
            return true;
        }

        return false;

    }

    isEmpty(coordinate) {
        if (this.board[coordinate[0]][coordinate[1]] === null) {
            return true;
        }
        return false;
    }

    // eslint-disable-next-line class-methods-use-this
    isOnBoard(coordinate) {
        if (coordinate[0] < 0 || coordinate[0] > 10 || coordinate[1] < 0 || coordinate[1] > 10) {
            return false;
        }
        return true;
    }

    // eslint-disable-next-line class-methods-use-this
    buildBoard() {
        const rows = 10;
        const columns = 10;
        const newBoard = [];

        for (let i = 0; i < rows; i++) {
            newBoard[i] = [];
            for (let j = 0; j < columns; j++) {
                newBoard[i].push(null);
            }
        }

        return newBoard;
    }

}

class Player {

    constructor(cpu = false) {
        this.cpu = cpu
    }

    isCPU() {

    }

}



export { Ship, Player, Gameboard };