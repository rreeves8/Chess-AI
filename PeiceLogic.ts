//[trueIfForward, trueIfIsFirst, trueIfDiagonal]

import { Peice } from "./DecisionTree"
import { Board, MoveValidator, PeiceADT, Vector } from "./types"

export const validateMove = (board: Board, peice: Peice, i: number, j: number, nextI: number, nextJ: number, special?: Array<boolean>) => {
    return (
        !peiceInTheWay(board, i, j, nextI, nextJ) &&
        (PeiceDirections.get(peice.type) as MoveValidator)(i, j, nextI, nextJ, special)
    )
}


const PeiceDirections: Map<PeiceADT, MoveValidator> = new Map()
    .set('castle', (i: number, j: number, nextI: number, nextJ: number) => {
        let vector = toVector(i, j, nextI, nextJ)
        return inBounds(nextI, nextJ) && isStraight(vector) && !isDiagonal(vector)
    })
    .set('knight', (i: number, j: number, nextI: number, nextJ: number) => {
        let vector = toVector(i, j, nextI, nextJ)

        let up = toPositive(vector.dy) === 3 && toPositive(vector.dx) === 2
        let down = toPositive(vector.dy) === 2 && toPositive(vector.dx) === 3

        return inBounds(nextI, nextJ) && up && down
    })
    .set('bishop', (i: number, j: number, nextI: number, nextJ: number) => {
        let vector = toVector(i, j, nextI, nextJ)

        return inBounds(nextI, nextJ) && !isStraight(vector) && isDiagonal(vector)
    })
    .set('queen', () => true)
    .set('king', (i: number, j: number, nextI: number, nextJ: number) => {
        let vector = toVector(i, j, nextI, nextJ)

        return inBounds(nextI, nextJ) && pythagrous(vector) < Math.sqrt(2)
    })
    .set('pawn', (i: number, j: number, nextI: number, nextJ: number, special: Array<boolean>) => {
        let vector = toVector(i, j, nextI, nextJ)
        let distance = special[1] ? 2 : 1
        let direction = special[0] ? distance : -distance

        return inBounds(nextI, nextJ) && vector.dy === direction && vector.dy === 0
    })


const peiceInTheWay = (board: Board, i: number, j: number, nextI: number, nextJ: number) => {
    for (let ii = i; i <= nextI; ii++) {
        for (let jj = j; jj <= nextJ; jj++) {
            if (board[ii][jj] instanceof Peice) {
                return true
            }
        }
    }

    return false
}

const inBounds = (nextI: number, nextJ: number) => {
    if (nextI > 7) {
        return false
    }
    if (nextJ > 7) {
        return false
    }
    return true
}

const toVector = (i: number, j: number, nextI: number, nextJ: number): Vector => {
    return {
        dx: nextI - i,
        dy: nextJ - j
    }
}

const isStraight = (vector: Vector): boolean => (vector.dx === 0 && vector.dy !== 0) || (vector.dy === 0 && vector.dx !== 0)
const isDiagonal = (vector: Vector): boolean => {
    let converted = positive(vector)
    return converted.dx === converted.dy
}

const toPositive = (change: number) => change < 0 ? change * -1 : change

const positive = (vector: Vector): Vector => ({
    dx: toPositive(vector.dx),
    dy: toPositive(vector.dy)
})

const pythagrous = (vector: Vector) => Math.sqrt(Math.pow(vector.dx, 2) + Math.pow(vector.dy, 2))
