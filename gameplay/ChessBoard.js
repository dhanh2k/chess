import { createCellElements, createPieceElements } from "./function.js"

export default class ChessBoard {
    constructor(chessboardElement){
        this.chessboardElement = chessboardElement
        this.cells = createCellElements(chessboardElement).map((cellElement, index) => {
            return new Cell(cellElement, index % 8, Math.floor(index/8))
        })
        this.pieces = createPieceElements(chessboardElement, this.cells)
    }
}

class Cell {
    constructor(cellElement, x, y){
        this.cellElement = cellElement
        this.x = x
        this.y = y
        if(this.x % 2 == 0 && this.y % 2 == 0 || this.x % 2 == 1 && this.y % 2 == 1){
            this.cellElement.classList.add("white")
        }else{
            this.cellElement.classList.add("black")
        }
    }

    set setPiece(value){
        this.piece = value
        this.piece.setX = this.x
        this.piece.setY = this.y
    }
}
