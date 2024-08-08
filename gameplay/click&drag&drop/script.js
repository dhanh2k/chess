import ChessBoard from "../ChessBoard.js";
import { checkAvailableCheckMove, deleteAvailableMove, deleteBlockedMove, findAvailableMove, findCell, findPiece, findPieceByTypeAndColor } from "../function.js";

const chessboardElement = document.getElementById("chessboard")

const chessboard = new ChessBoard(chessboardElement)

let x = undefined, y = undefined
let hasMoved = false
let pieceWasSelected = undefined
let flag = false
let flag2 = false
let captured = false
let lastMovedPiece = undefined

chessboard.pieces.forEach(piece => {
    piece.pieceElement.addEventListener("mousedown", () => {
        if (pieceWasSelected == undefined) {
            pieceWasSelected = piece
        } else {
            if (pieceWasSelected == piece) {
                flag = true
            } else {
                const cellTarget = findCell(chessboard.cells, piece.x, piece.y)
                if (cellTarget.cellElement.classList.contains("available")) {
                    piece.pieceElement.remove()
                    chessboard.pieces.splice(chessboard.pieces.indexOf(piece), 1)
                    cellTarget.piece = undefined
                    const thatPiece = findPiece(chessboard.pieces, pieceWasSelected.x, pieceWasSelected.y)
                    thatPiece.setX = cellTarget.x
                    thatPiece.setY = cellTarget.y
                    thatPiece.firstMove = true
                    captured = true
                    deleteAvailableMove(chessboard.cells)

                    // lam noi bat nuoc chieu
                    if (checkAvailableCheckMove(chessboard.pieces, lastMovedPiece, thatPiece.color).length != 0) {
                        const pieceWasCheck = findPieceByTypeAndColor(chessboard.pieces, "king", thatPiece.color == "white" ? "black" : "white")
                        pieceWasCheck.wasChecked = true
                        findCell(chessboard.cells, pieceWasCheck.x, pieceWasCheck.y).cellElement.classList.add("check")
                        checkAvailableCheckMove(chessboard.pieces, lastMovedPiece, piece.color).forEach(piece => {
                            findCell(chessboard.cells, piece.x, piece.y).cellElement.classList.add("checker")
                        })
                    }
                    // het code lam noi bat nuoc chieu

                    lastMovedPiece = findPiece(chessboard.pieces, pieceWasSelected.x, pieceWasSelected.y)
                    // checkAvailableCheckMove(lastMovedPiece, chessboard.pieces, lastMovedPiece).forEach(arr => {
                    //     findCell(chessboard.cells, arr[0], arr[1]).cellElement.classList.add("check")
                    // })



                    pieceWasSelected = undefined

                } else {
                    deleteAvailableMove(chessboard.cells)
                    pieceWasSelected = piece
                }

                //----
                // deleteAvailableMove(chessboard.cells)
                // pieceWasSelected = piece      
            }
        }
        x = piece.x, y = piece.y
        if (captured == false) {
            // console.log(findAvailableMove(piece, piece.x, piece.y, chessboard.pieces))
            // console.log(deleteBlockedMove(piece, chessboard.pieces, findAvailableMove(piece, piece.x, piece.y, chessboard.pieces)))
            deleteBlockedMove(piece, chessboard.pieces, findAvailableMove(piece, piece.x, piece.y, chessboard.pieces), lastMovedPiece).forEach((arr) => {
                findCell(chessboard.cells, arr[0], arr[1]).cellElement.classList.add("available")
            })
        }
        captured = false

        document.addEventListener("mousemove", document.fn = function fn(e) {
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

        document.addEventListener("mouseup", document.fn1 = function fn1() {
            document.removeEventListener('mousemove', document.fn)
            piece.pieceElement.style.setProperty("z-index", "0")
            if (findCell(chessboard.cells, x, y).cellElement.classList.contains("available")) {
                if (findPiece(chessboard.pieces, x, y) != undefined) {
                    findPiece(chessboard.pieces, x, y).pieceElement.remove()
                    chessboard.pieces.splice(chessboard.pieces.indexOf(findPiece(chessboard.pieces, x, y)), 1)

                    piece.setX = x
                    piece.setY = y
                    piece.firstMove = true

                    // code phong hau
                    if (piece.type == "pawn") {
                        if (piece.y == 7) {
                            piece.queening()
                        }

                        if (piece.y == 0) {
                            piece.queening()
                        }
                    }
                    // het code phong hau

                    // lam noi bat nuoc chieu
                    if (checkAvailableCheckMove(chessboard.pieces, lastMovedPiece, piece.color).length != 0) {
                        const pieceWasCheck = findPieceByTypeAndColor(chessboard.pieces, "king", piece.color == "white" ? "black" : "white")
                        pieceWasCheck.wasChecked = true
                        findCell(chessboard.cells, pieceWasCheck.x, pieceWasCheck.y).cellElement.classList.add("check")
                        checkAvailableCheckMove(chessboard.pieces, lastMovedPiece, piece.color).forEach(piece => {
                            findCell(chessboard.cells, piece.x, piece.y).cellElement.classList.add("checker")
                        })
                    }
                    // het code lam noi bat nuoc chieu
                    lastMovedPiece = piece

                } else {
                    // nhap thanh
                    if (pieceWasSelected.type == "king") {
                        if (pieceWasSelected.color == "white") {
                            if (x - pieceWasSelected.x == 2) {
                                console.log("Right Castling")
                                const castlePiece = findPiece(chessboard.pieces, 7, 0)
                                castlePiece.pieceElement.style.setProperty("transition", "0.4s ease-in-out")
                                castlePiece.setX = 4
                            }
                            if (x - pieceWasSelected.x == -2) {
                                console.log("Left Castling")
                                const castlePiece = findPiece(chessboard.pieces, 0, 0)
                                castlePiece.pieceElement.style.setProperty("transition", "0.4s ease-in-out")
                                castlePiece.setX = 2
                            }
                        }
                        if (pieceWasSelected.color == "black") {
                            if (x - pieceWasSelected.x == 2) {
                                console.log("Right Castling")
                                const castlePiece = findPiece(chessboard.pieces, 7, 7)
                                castlePiece.pieceElement.style.setProperty("transition", "0.4s ease-in-out")
                                castlePiece.setX = 4
                            }
                            if (x - pieceWasSelected.x == -2) {
                                console.log("Left Castling")
                                const castlePiece = findPiece(chessboard.pieces, 0, 7)
                                castlePiece.pieceElement.style.setProperty("transition", "0.4s ease-in-out")
                                castlePiece.setX = 2
                            }
                        }
                    }
                    // het code nhap thanh

                    //bat tot ngang duong
                    if (pieceWasSelected.type == "pawn") {
                        if (pieceWasSelected.color == "white") {
                            if (pieceWasSelected.x - x == 1) {
                                console.log("Trang Trai")
                                findPiece(chessboard.pieces, pieceWasSelected.x - 1, y - 1).pieceElement.remove()
                                chessboard.pieces.splice(chessboard.pieces.indexOf(findPiece(chessboard.pieces, x - 1, y)), 1)
                            }

                            if (pieceWasSelected.x - x == -1) {
                                findPiece(chessboard.pieces, pieceWasSelected.x + 1, y - 1).pieceElement.remove()
                                chessboard.pieces.splice(chessboard.pieces.indexOf(findPiece(chessboard.pieces, x + 1, y)), 1)
                            }
                        }

                        if (pieceWasSelected.color == "black") {
                            if (pieceWasSelected.x - x == 1) {
                                findPiece(chessboard.pieces, pieceWasSelected.x - 1, y + 1).pieceElement.remove()
                                chessboard.pieces.splice(chessboard.pieces.indexOf(findPiece(chessboard.pieces, x - 1, y)), 1)
                            }

                            if (pieceWasSelected.x - x == -1) {
                                findPiece(chessboard.pieces, pieceWasSelected.x + 1, y + 1).pieceElement.remove()
                                chessboard.pieces.splice(chessboard.pieces.indexOf(findPiece(chessboard.pieces, x + 1, y)), 1)
                            }
                        }
                    }
                    //het code bat tot ngang duong

                    piece.setX = x
                    piece.setY = y
                    piece.firstMove = true

                    // lam noi bat nuoc chieu
                    if (checkAvailableCheckMove(chessboard.pieces, lastMovedPiece, piece.color).length != 0) {
                        const pieceWasCheck = findPieceByTypeAndColor(chessboard.pieces, "king", piece.color == "white" ? "black" : "white")
                        pieceWasCheck.wasChecked = true
                        findCell(chessboard.cells, pieceWasCheck.x, pieceWasCheck.y).cellElement.classList.add("check")
                        checkAvailableCheckMove(chessboard.pieces, lastMovedPiece, piece.color).forEach(piece => {
                            findCell(chessboard.cells, piece.x, piece.y).cellElement.classList.add("checker")
                        })
                    }
                    // het code lam noi bat nuoc chieu

                    // code phong hau
                    if (piece.type == "pawn") {
                        if (piece.y == 7) {
                            piece.queening()
                        }

                        if (piece.y == 0) {
                            piece.queening()
                        }
                    }
                    lastMovedPiece = piece
                    // het code phong hau


                }
                hasMoved = true
            } else {
                piece.pieceElement.style.setProperty("transition", "0.4s ease-in-out")
                piece.setX = piece.x
                piece.setY = piece.y
                findCell(chessboard.cells, x, y).cellElement.classList.remove("green")
                x = piece.x
                y = piece.y
            }
            if (hasMoved) {
                deleteAvailableMove(chessboard.cells)
            }

            if (flag == true && flag2 == false) {
                deleteAvailableMove(chessboard.cells)
                pieceWasSelected = undefined
            }
            if (flag == true && flag2 == true) {
                if (hasMoved == true) {
                    pieceWasSelected = undefined
                } else {
                    console.log(pieceWasSelected)
                }
            }
            if (flag == false && flag2 == true) {
                if (hasMoved == true) {
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
        if (cell.cellElement.classList.contains("available")) {
            // nhap thanh
            if (pieceWasSelected.type == "king") {
                if (pieceWasSelected.color == "white") {
                    if (cell.x - pieceWasSelected.x == 2) {
                        console.log("Right Castling")
                        const castlePiece = findPiece(chessboard.pieces, 7, 0)
                        castlePiece.pieceElement.style.setProperty("transition", "0.4s ease-in-out")
                        castlePiece.setX = 4
                    }
                    if (cell.x - pieceWasSelected.x == -2) {
                        console.log("Left Castling")
                        const castlePiece = findPiece(chessboard.pieces, 0, 0)
                        castlePiece.pieceElement.style.setProperty("transition", "0.4s ease-in-out")
                        castlePiece.setX = 2
                    }
                }
                if (pieceWasSelected.color == "black") {
                    if (cell.x - pieceWasSelected.x == 2) {
                        console.log("Right Castling")
                        const castlePiece = findPiece(chessboard.pieces, 7, 7)
                        castlePiece.pieceElement.style.setProperty("transition", "0.4s ease-in-out")
                        castlePiece.setX = 4
                    }
                    if (cell.x - pieceWasSelected.x == -2) {
                        console.log("Left Castling")
                        const castlePiece = findPiece(chessboard.pieces, 0, 7)
                        castlePiece.pieceElement.style.setProperty("transition", "0.4s ease-in-out")
                        castlePiece.setX = 2
                    }
                }
            }
            // het code nhap thanh

            //bat tot ngang duong
            if (pieceWasSelected.type == "pawn") {
                if (pieceWasSelected.x - cell.x == 1) {
                    findPiece(chessboard.pieces, x - 1, y).pieceElement.remove()
                    chessboard.pieces.splice(chessboard.pieces.indexOf(findPiece(chessboard.pieces, x - 1, y)), 1)
                }

                if (pieceWasSelected.x - cell.x == -1) {
                    findPiece(chessboard.pieces, x + 1, y).pieceElement.remove()
                    chessboard.pieces.splice(chessboard.pieces.indexOf(findPiece(chessboard.pieces, x + 1, y)), 1)
                }
            }
            //het code bat tot ngang duong

            const piece = findPiece(chessboard.pieces, x, y)
            piece.setX = cell.x
            piece.setY = cell.y
            piece.firstMove = true
            pieceWasSelected = undefined
            flag = false
            flag2 = false
            deleteAvailableMove(chessboard.cells)

            // lam noi bat nuoc chieu
            if (checkAvailableCheckMove(chessboard.pieces, lastMovedPiece, piece.color).length != 0) {
                const pieceWasCheck = findPieceByTypeAndColor(chessboard.pieces, "king", piece.color == "white" ? "black" : "white")
                pieceWasCheck.wasChecked = true
                findCell(chessboard.cells, pieceWasCheck.x, pieceWasCheck.y).cellElement.classList.add("check")
                checkAvailableCheckMove(chessboard.pieces, lastMovedPiece, piece.color).forEach(piece => {
                    findCell(chessboard.cells, piece.x, piece.y).cellElement.classList.add("checker")
                })
            }
            // het code lam noi bat nuoc chieu

            // code phong hau
            if (piece.type == "pawn") {
                if (piece.y == 7) {
                    piece.queening()
                }

                if (piece.y == 0) {
                    piece.queening()
                }
            }

            lastMovedPiece = piece

            // het code phong hau


        } else {
            pieceWasSelected = undefined
            deleteAvailableMove(chessboard.cells)
        }
    })
})