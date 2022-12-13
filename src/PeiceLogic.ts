//[trueIfForward, trueIfIsFirst, trueIfDiagonal]

import { Peice } from "./Peice";
import { Board, MoveValidator, PeiceADT, Vector } from "./types";

export const validateMove = (board: Board, i: number, j: number, nextI: number, nextJ: number) => {
    return !peiceInTheWay(board, i, j, nextI, nextJ) && inBounds(nextI, nextJ);
};

export const peiceInTheWay = (board: Board, i: number, j: number, nextI: number, nextJ: number) => {
    for (let ii = i; i <= nextI; ii++) {
        for (let jj = j; jj <= nextJ; jj++) {
            if (board[ii][jj] instanceof Peice) {
                return true;
            }
        }
    }

    return false;
};

export const inBounds = (nextI: number, nextJ: number) => {
    if (nextI > 7) {
        return false;
    }
    if (nextJ > 7) {
        return false;
    }
    return true;
};

export const toVector = (i: number, j: number, nextI: number, nextJ: number): Vector => {
    return {
        dx: nextI - i,
        dy: nextJ - j,
    };
};

export const isStraight = (vector: Vector): boolean => (vector.dx === 0 && vector.dy !== 0) || (vector.dy === 0 && vector.dx !== 0);
export const isDiagonal = (vector: Vector): boolean => {
    let converted = positive(vector);
    return converted.dx === converted.dy;
};

export const toPositive = (change: number) => (change < 0 ? change * -1 : change);

export const positive = (vector: Vector): Vector => ({
    dx: toPositive(vector.dx),
    dy: toPositive(vector.dy),
});

export const pythagrous = (vector: Vector) => Math.sqrt(Math.pow(vector.dx, 2) + Math.pow(vector.dy, 2));
