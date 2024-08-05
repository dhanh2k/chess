import ChessBoard from "../ChessBoard.js";
import { deleteAvailableMove, findAvailableMove, findCell, findPiece } from "../function.js";

const chessboardElement = document.getElementById("chessboard")

const chessboard = new ChessBoard(chessboardElement)

let x = undefined, y = undefined
let hasMoved = false
let pieceWasSelected = undefined
let flag = false
let flag2 = false

chessboard.pieces.forEach(piece => {
    piece.pieceElement.addEventListener("mousedown", () => {
        if(pieceWasSelected == undefined){
            pieceWasSelected = piece
        }else{
            if(pieceWasSelected == piece){
                flag = true
            }else{
                deleteAvailableMove(chessboard.cells)
                pieceWasSelected = piece      
            }
        }
        x = piece.x, y = piece.y
        findAvailableMove(piece.x, piece.y).forEach((arr) => {
            findCell(chessboard.cells, arr[0], arr[1]).cellElement.classList.add("available")
        })
        
        document.addEventListener("mousemove", document.fn = function fn(e){
            piece.pieceElement.style.setProperty("transition", "none")
            piece.pieceElement.style.setProperty("z-index", "1")
            if (e.clientY < chessboardElement.offsetTop) {
                piece.pieceElement.style.top = -4 + 'vh'
                y = 0
            } else {
                if (e.clientY > (chessboardElement.offsetTop + (document.documentElement.clientHeight * 0.64))) {
                    piece.pieceElement.style.top = 60 + 'vh'
                    y = 7
                } else {
                    piece.pieceElement.style.top = e.clientY - (chessboardElement.offsetTop) - (document.documentElement.clientHeight * 0.04) + 'px'
                    y = Math.floor((e.clientY - (chessboardElement.offsetTop)) / (document.documentElement.clientHeight * 0.08))
                }
            }

            if (e.clientX < chessboardElement.offsetLeft) {
                piece.pieceElement.style.left = -4 + 'vh'
                x = 0
            } else {
                if (e.clientX > (chessboardElement.offsetLeft + (document.documentElement.clientHeight * 0.64))) {
                    piece.pieceElement.style.left = 60 + 'vh'
                    x = 7
                } else {
                    piece.pieceElement.style.left = e.clientX - (chessboardElement.offsetLeft) - (document.documentElement.clientHeight * 0.04) + 'px'
                    x = Math.floor((e.clientX - (chessboardElement.offsetLeft)) / (document.documentElement.clientHeight * 0.08))
                }
            }

            chessboard.cells.forEach((cell) => {
                if (cell.x == x && cell.y == y) {
                    cell.cellElement.classList.add("green")
                } else {
                    if (cell.cellElement.classList.contains("green")) {
                        cell.cellElement.classList.remove("green")
                    }
                }
            })
            flag2 = true
        })

        document.addEventListener("mouseup", document.fn1 = function fn1(){
            document.removeEventListener('mousemove', document.fn)
            piece.pieceElement.style.setProperty("z-index", "0")
            if (findCell(chessboard.cells, x, y).cellElement.classList.contains("available")) {
                piece.setX = x
                piece.setY = y
                hasMoved = true
            } else {
                piece.pieceElement.style.setProperty("transition", "0.4s ease-in-out")
                piece.setX = piece.x
                piece.setY = piece.y
                findCell(chessboard.cells, x, y).cellElement.classList.remove("green")
                x = piece.x
                y = piece.y
            }
            if(hasMoved){
                deleteAvailableMove(chessboard.cells)
            }

            if(flag == true && flag2 == false){
                deleteAvailableMove(chessboard.cells)
                pieceWasSelected = undefined
            }
            if(flag == true && flag2 == true){
                if(hasMoved == true){
                    pieceWasSelected = undefined
                }else{
                    console.log(pieceWasSelected)
                }
            }
            if(flag == false && flag2 == true){
                if(hasMoved == true){
                    pieceWasSelected = undefined
                }
            }
            flag = false
            flag2 = false
            findCell(chessboard.cells, x, y).cellElement.classList.remove("green")
            document.removeEventListener('mouseup', document.fn1)
            hasMoved = false
        })
    })
})

chessboard.cells.forEach(cell => {
    cell.cellElement.addEventListener("click", () => {
        if(cell.cellElement.classList.contains("available")){
            const piece = findPiece(chessboard.pieces, x, y)
            piece.setX = cell.x
            piece.setY = cell.y
            pieceWasSelected = undefined
            flag = false
            flag2 = false
            deleteAvailableMove(chessboard.cells) 
        }else{
            deleteAvailableMove(chessboard.cells)
        }
    })
})