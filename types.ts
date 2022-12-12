import { Peice } from "./DecisionTree"

export type PeiceADT = 'castle' | 'knight' | 'bishop' | 'queen' | 'king' | 'pawn'
export type Player = 'black' | 'white'
export type Vector = {
    dx: number
    dy: number
}
export type Board = Array<Array<Peice | ''>>


export type MoveValidator = (i: number, j: number, nextI: number, nextJ: number, special?: Array<boolean>) => void