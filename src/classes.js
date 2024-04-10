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
    }

    receiveAttack(x,y) {

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