class Ship {

    constructor(length, hits = 0, sunk = false) {
        this.length = length,
            this.hits = hits,
            this.sunk = sunk,
    }


    hit() {
        
    }

    isSunk() {

    }

}

class Player {

    constructor(cpu = false) {
        this.cpu = cpu
    }

    isCPU() {

    }

}

class Gameboard {

    constructor(missedAttacks = 0, numberOfShips) {
        this.missedAttacks = missedAttacks,
        this.numberOfShips = numberOfShips
    }

    receiveAttack(x,y) {

    }

}