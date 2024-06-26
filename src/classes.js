/* eslint-disable class-methods-use-this */
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
        this.isSunk();
        return this.hits && this.sunk;
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

    constructor(name, missedAttacks = [], attemptedByOpponent = [], numberOfShips = 4, ships = []) {
        this.name = name,
        this.missedAttacks = missedAttacks,
        this.attemptedByOpponent = attemptedByOpponent;
        this.numberOfShips = numberOfShips,
        this.ships = ships,
        this.board = this.buildBoard();
    }

    placeShip(coordinate, length, horizontal = true) { 

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
            // Create new ship
            const ship = new Ship(length);
            this.ships.push(ship);
            // If all cells are on the board && empty, fill cells with reference to the ship
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
            // Create new ship
            const ship = new Ship(length);
            this.ships.push(ship);
            // If all cells are on the board && empty, fill cells with reference to the ship
            for (let i = 0; i < length; i++) {
                this.board[xCoor][coordinate[1]] = ship;
                xCoor++;
            }
        }

        return this.board;

    }

    receiveAttack(x, y) {
        
        if (this.attemptedByOpponent.includes(`[${x}, ${y}]`) === true) {
            return "Already Tried This Coordinate";
        }

        this.attemptedByOpponent.push(`[${x}, ${y}]`);

        if (this.isEmpty([x,y]) === true) {
            this.missedAttacks.push([x, y]);
            return "missed";
        } 
        
        const attackedShip = this.board[x][y];
        attackedShip.hit();

        if (attackedShip.sunk === true) {
            this.numberOfShips--;
            return "sunk";
        }
        console.log(attackedShip);
        return attackedShip;
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

    areAllShipsSunk() {
       return this.numberOfShips <= 0
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

    resetBoard() {
        while (this.missedAttacks.length > 0) {
            this.missedAttacks.pop();
        }
        while (this.attemptedByOpponent.length > 0) {
            this.attemptedByOpponent.pop();
        }
        this.numberOfShips = 2;
        while (this.ships.length > 0) {
            this.ships.pop();
        }
        this.board = this.buildBoard();

        return this;
    }

}

class Player {

    constructor(name) {
        this.name = name;
        this.attemptedMap = this.buildAttemptedMap();
    }

    takeShotCPU() {
        // filter through attempted map to find null coordinates
        const availableMoves = this.filter(this.attemptedMap);
        const randomCoordinates = availableMoves[Math.floor(Math.random() * availableMoves.length)];

        this.attemptedMap[randomCoordinates[0]][randomCoordinates[1]] = "x";

        return randomCoordinates
    }

    takeShotHuman(x, y) {

        const coordinates = [x,y]

        return coordinates;
    }

    buildAttemptedMap() {
        const rows = 10;
        const columns = 10;
        const newMap = [];

        for (let i = 0; i < rows; i++) {
            newMap[i] = [];
            for (let j = 0; j < columns; j++) {
                newMap[i].push(null);
            }
        }

        return newMap;
    }

    filter(array) {
        // Create result array to hold all the 'null' coordinates in our attemptedMap
        // Remember, attemptedMap is separate from any gameboard. This is just how
        // the player tracks their shots
        const result = [];

        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length; j++) {
                // Creating an array of all the open (null) coordinates in our attemptedMap
                // As the player calls takeShotCPU method (takes shots), this result array will get smaller,
                // meaning the number of available moves decreases. (SEE IN takeShotCPU METHOD)
                // Note, this not very efficient in time-complexity (Big-O of n^2 I think bc of loop within loop), since this is being called every turn
                // and iterates over the entire attemptedMap every... single... time.
                if (array[i][j] === null) {
                    result.push([i, j])
                }
                
            }
        }

        return result;
    }

    resetPlayer() {
        this.attemptedMap = this.buildAttemptedMap();
    }

}



export { Ship, Player, Gameboard };