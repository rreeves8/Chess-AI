import { ChessBoard } from "./Chess";

// class Parent {
//     b: any

//     constructor(b: any){
//         this.b = b
//     }

//     getType(){
//         return this.constructor.name
//     }
// }

// class Child extends Parent {
//     cool(){
//         console.log('fire')
//     }
// }

// class Child2 extends Parent {
//     dope(){
//         console.log('fire')
//     }
// }

// let child2 = new Child(23)

// console.log(child2.getType())

let chess = new ChessBoard();

const testPawn = (chess: ChessBoard) => {
    chess.printBoard();

    console.log(chess.makeMove(6, 0, 4, 0, "white"));
    console.log(chess.makeMove(4, 0, 3, 0, "white"));

    chess.printBoard();
};

const testKnight = (chess: ChessBoard) => {
    chess.printBoard();

    console.log(chess.makeMove(7, 1, 6, 1, "white"));
    console.log(chess.makeMove(7, 1, 5, 0, "white"));
    console.log(chess.makeMove(7, 1, 5, 2, "white"));

    chess.printBoard();
};

testKnight(chess);

