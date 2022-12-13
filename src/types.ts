import { Peice } from "./Peice";

export type Move = {
    i: number;
    j: number;
};
export interface PeiceADT {
    getType(): string;
    getValidMoves(board: Board): MoveValidator;
}
export type PeiceType = "castle" | "knight" | "bishop" | "queen" | "king" | "pawn";
export type Player = "black" | "white";
export type Vector = {
    dx: number;
    dy: number;
};
export type Board = Array<Array<Peice | "">>;

export type MoveValidator = (i: number, j: number, nextI: number, nextJ: number) => boolean;