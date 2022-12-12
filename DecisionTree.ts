import { validateMove } from "./PeiceLogic";
import { Board, PeiceADT, Player } from "./types";

const startingPos = ['castle', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'castle']

const PeiceCost: Map<PeiceADT, number> = new Map()
    .set('castle', 50)
    .set('knight', 30)
    .set('bishop', 30)
    .set('queen', 90)
    .set('king', 900)
    .set('pawn', 10)


export class Peice {
    type: PeiceADT;
    color: Player

    constructor(type: PeiceADT, color: Player) {
        this.type = type
    }

}


class ChessBoard {
    turn: Player = 'white'
    board: Board;

    constructor(board?: Board) {
        this.board = board ? board : [
            Array.from(Array(8), (v: any, k: number) => new Peice(startingPos[k] as PeiceADT, 'black')),
            Array.from(Array(8), (v: any, k: number) => new Peice('pawn', 'black')),
            Array.from(Array(4), (v: any, k: number) => ''),
            Array.from(Array(8), (v: any, k: number) => new Peice('pawn', 'white')),
            Array.from(Array(8), (v: any, k: number) => new Peice(startingPos[k] as PeiceADT, 'white')),
        ]
    }

    makeMove(i: number, j: number, nextI: number, nextJ: number, player: Player): boolean {
        let currentPosition = this.board[i][j]

        if (currentPosition instanceof Peice && currentPosition.color === player) {
            let nextPos = this.board[nextI][nextJ]

            let pawnMove = currentPosition.type === 'pawn' ? [true] : undefined

            if (validateMove(this.board, currentPosition, i, j, nextI, nextJ, pawnMove)) {
                if (nextPos instanceof Peice) {
                    if (nextPos.color !== player) {
                        this.board[nextI][nextJ] = currentPosition
                        this.board[i][j] = ''
                        return true
                    }
                    else {
                        return false
                    }
                }
                else {
                    this.board[nextI][nextJ] = currentPosition
                    this.board[i][j] = ''
                    return true
                }
            }
            else {
                return false
            }
        }
        else {
            return false
        }
    }
}





export default class DecisionTree {

}