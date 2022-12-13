import { Peice, createPeice, Pawn } from "./Peice";
import { validateMove } from "./PeiceLogic";
import { Board, PeiceADT, PeiceType, Player } from "./types";

const startingPos = ["castle", "knight", "bishop", "queen", "king", "bishop", "knight", "castle"];

export class ChessBoard {
    turn: Player = "white";
    board: Board;

    constructor(board?: Board) {
        this.board = board
            ? board
            : [
                  Array.from(Array(8), (v: any, k: number) => createPeice(startingPos[k] as PeiceType, "black", 0, k)),
                  Array.from(Array(8), (v: any, k: number) => createPeice("pawn", "black", 1, k)),
                  ...Array.from(Array(4), (v: any, k: number) => new Array(8).fill("")),
                  Array.from(Array(8), (v: any, k: number) => createPeice("pawn", "white", 6, k)),
                  Array.from(Array(8), (v: any, k: number) => createPeice(startingPos[k] as PeiceType, "white", 7, k)),
              ];
    }

    makeMove(i: number, j: number, nextI: number, nextJ: number, player: Player): boolean {
        let currentPosition = this.board[i][j];
        let nextPos = this.board[nextI][nextJ];

        if (currentPosition instanceof Peice && currentPosition.getPlayer() === player) {
            let validateMove = currentPosition.getValidMoves(this.board);

            if (validateMove(i, j, nextI, nextJ)) {
                if (nextPos instanceof Peice) {
                    if (nextPos.getPlayer() !== player) {
                        this.updateBoard(i, j, nextI, nextJ, currentPosition);
                        return true;
                    }
                } else {
                    this.updateBoard(i, j, nextI, nextJ, currentPosition);
                    return true;
                }
            }
        }

        return false;
    }

    private updateBoard(i: number, j: number, nextI: number, nextJ: number, newValue: Peice | "") {
        if (newValue instanceof Peice) {
            newValue.updatePosition(nextI, nextJ);
        }
        this.board[nextI][nextJ] = newValue;
        this.board[i][j] = "";
    }

    printBoard() {
        console.table(
            this.board.map((row) => {
                return row.map((peice) => {
                    if (peice instanceof Peice) {
                        return peice.getType() + "-" + peice.getPlayer();
                    } else {
                        return peice;
                    }
                });
            })
        );
    }
}
