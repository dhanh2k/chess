import Piece from "./Piece.js"

export function createCellElements(chessboardElement) {
    const cells = []
    for (let i = 0; i < 64; i++) {
        const cell = document.createElement("div")
        chessboardElement.appendChild(cell)
        cells.push(cell)
    }
    return cells
}

export function createPieceElements(chessboardElement, cells) {
    const pieces = []

    pieces.push(placePiece("king", "white", 3, 0, cells))
    pieces.push(placePiece("king", "black", 3, 7, cells))

    // pieces.push(placePiece("queen", "white", 4, 0, cells))
    pieces.push(placePiece("queen", "black", 4, 7, cells))

    // pieces.push(placePiece("bishop", "white", 2, 0, cells))
    // pieces.push(placePiece("bishop", "black", 2, 7, cells))
    // pieces.push(placePiece("bishop", "white", 5, 0, cells))
    // pieces.push(placePiece("bishop", "black", 5, 7, cells))

    // pieces.push(placePiece("knight", "white", 1, 0, cells))
    // pieces.push(placePiece("knight", "black", 1, 7, cells))
    // pieces.push(placePiece("knight", "white", 6, 0, cells))
    // pieces.push(placePiece("knight", "black", 6, 7, cells))

    pieces.push(placePiece("rook", "white", 0, 0, cells))
    // pieces.push(placePiece("rook", "black", 0, 7, cells))
    pieces.push(placePiece("rook", "white", 7, 0, cells))
    // pieces.push(placePiece("rook", "black", 7, 7, cells))

    // pieces.push(placePiece("pawn", "black", 0, 6, cells))
    // pieces.push(placePiece("pawn", "black", 1, 6, cells))
    // pieces.push(placePiece("pawn", "black", 2, 6, cells))
    // pieces.push(placePiece("pawn", "black", 3, 6, cells))
    // pieces.push(placePiece("pawn", "black", 4, 6, cells))
    // pieces.push(placePiece("pawn", "black", 5, 6, cells))
    // pieces.push(placePiece("pawn", "black", 6, 6, cells))
    // pieces.push(placePiece("pawn", "black", 7, 6, cells))

    // pieces.push(placePiece("pawn", "white", 0, 1, cells))
    // pieces.push(placePiece("pawn", "white", 1, 1, cells))
    // pieces.push(placePiece("pawn", "white", 2, 1, cells))
    // pieces.push(placePiece("pawn", "white", 3, 1, cells))
    // pieces.push(placePiece("pawn", "white", 4, 1, cells))
    // pieces.push(placePiece("pawn", "white", 5, 1, cells))
    // pieces.push(placePiece("pawn", "white", 6, 1, cells))
    // pieces.push(placePiece("pawn", "white", 7, 1, cells))

    pieces.forEach(piece => {
        chessboardElement.appendChild(piece.pieceElement)
    });
    return pieces
}

export function findCell(cells, x, y) {
    return cells.filter((cell) => {
        return cell.x == x && cell.y == y
    })[0]
}

export function findPiece(pieces, x, y) {
    return pieces.filter((piece) => {
        return piece.x == x && piece.y == y
    })[0]
}

export function placePiece(type, color, x, y, cells) {
    return findCell(cells, x, y).setPiece = new Piece(type, color)
}

export function findAvailableMove(piece, x, y, pieces) {
    switch (piece.type) {
        case "king":
            const kingCoordinates = [[x - 1, y - 1], [x, y - 1], [x + 1, y - 1],
            [x - 1, y], [x + 1, y],
            [x - 1, y + 1], [x, y + 1], [x + 1, y + 1]]

            if (piece.wasChecked == false) {
                if (piece.firstMove == false) {
                    if (piece.color == "white") {
                        // nước nhập thành bên trái
                        if (findPiece(pieces, 0, 0) != undefined) {
                            if (findPiece(pieces, 0, 0).firstMove == false) {
                                kingCoordinates.push([x - 2, y])
                            }
                        }

                        // nước nhập thành bên phải
                        if (findPiece(pieces, 7, 0) != undefined) {
                            if (findPiece(pieces, 7, 0).firstMove == false) {
                                kingCoordinates.push([x + 2, y], [x + 3, y])
                            }
                        }
                    }

                    if (piece.color == "black") {
                        // nước nhập thành bên trái
                        if (findPiece(pieces, 0, 7) != undefined) {
                            if (findPiece(pieces, 0, 7).firstMove == false) {
                                kingCoordinates.push([x - 2, y])
                            }
                        }

                        // nước nhập thành bên phải
                        if (findPiece(pieces, 7, 7) != undefined) {
                            if (findPiece(pieces, 7, 7).firstMove == false) {
                                kingCoordinates.push([x + 2, y], [x + 3, y])
                            }
                        }
                    }
                }
            }

            const kingAvailableCoordinates = kingCoordinates.filter((value) => {
                return value[0] >= 0 && value[1] >= 0 && value[0] <= 7 && value[1] <= 7
            })

            return kingAvailableCoordinates
        case "knight":
            const knightCoordinates = [[x - 1, y - 2], [x + 1, y - 2],
            [x - 2, y - 1], [x - 2, y + 1],
            [x + 2, y - 1], [x + 2, y + 1],
            [x - 1, y + 2], [x + 1, y + 2]
            ]

            const KnightAvailableCoordinates = knightCoordinates.filter((value) => {
                return value[0] >= 0 && value[1] >= 0 && value[0] <= 7 && value[1] <= 7
            })

            return KnightAvailableCoordinates
        case "bishop":
            const bishopCoordinates = [[x - 1, y - 1], [x - 2, y - 2], [x - 3, y - 3], [x - 4, y - 4], [x - 5, y - 5], [x - 6, y - 6], [x - 7, y - 7],
            [x + 1, y + 1], [x + 2, y + 2], [x + 3, y + 3], [x + 4, y + 4], [x + 5, y + 5], [x + 6, y + 6], [x + 7, y + 7],
            [x + 1, y - 1], [x + 2, y - 2], [x + 3, y - 3], [x + 4, y - 4], [x + 5, y - 5], [x + 6, y - 6], [x + 7, y - 7],
            [x - 1, y + 1], [x - 2, y + 2], [x - 3, y + 3], [x - 4, y + 4], [x - 5, y + 5], [x - 6, y + 6], [x - 7, y + 7]
            ]

            const bishopAvailableCoordinates = bishopCoordinates.filter((value) => {
                return value[0] >= 0 && value[1] >= 0 && value[0] <= 7 && value[1] <= 7
            })

            return bishopAvailableCoordinates
        case "rook":
            const rookCoordinates = [[x, y + 1], [x, y + 2], [x, y + 3], [x, y + 4], [x, y + 5], [x, y + 6], [x, y + 7],
            [x, y - 1], [x, y - 2], [x, y - 3], [x, y - 4], [x, y - 5], [x, y - 6], [x, y - 7],
            [x - 1, y], [x - 2, y], [x - 3, y], [x - 4, y], [x - 5, y], [x - 6, y], [x - 7, y],
            [x + 1, y], [x + 2, y], [x + 3, y], [x + 4, y], [x + 5, y], [x + 6, y], [x + 7, y]]

            const rookAvailableCoordinates = rookCoordinates.filter((value) => {
                return value[0] >= 0 && value[1] >= 0 && value[0] <= 7 && value[1] <= 7
            })

            return rookAvailableCoordinates
        case "queen":
            const queenCoordinates = [[x, y + 1], [x, y + 2], [x, y + 3], [x, y + 4], [x, y + 5], [x, y + 6], [x, y + 7],
            [x, y - 1], [x, y - 2], [x, y - 3], [x, y - 4], [x, y - 5], [x, y - 6], [x, y - 7],
            [x - 1, y], [x - 2, y], [x - 3, y], [x - 4, y], [x - 5, y], [x - 6, y], [x - 7, y],
            [x + 1, y], [x + 2, y], [x + 3, y], [x + 4, y], [x + 5, y], [x + 6, y], [x + 7, y],
            [x - 1, y - 1], [x - 2, y - 2], [x - 3, y - 3], [x - 4, y - 4], [x - 5, y - 5], [x - 6, y - 6], [x - 7, y - 7],
            [x + 1, y + 1], [x + 2, y + 2], [x + 3, y + 3], [x + 4, y + 4], [x + 5, y + 5], [x + 6, y + 6], [x + 7, y + 7],
            [x + 1, y - 1], [x + 2, y - 2], [x + 3, y - 3], [x + 4, y - 4], [x + 5, y - 5], [x + 6, y - 6], [x + 7, y - 7],
            [x - 1, y + 1], [x - 2, y + 2], [x - 3, y + 3], [x - 4, y + 4], [x - 5, y + 5], [x - 6, y + 6], [x - 7, y + 7]
            ]

            const queenAvailableCoordinates = queenCoordinates.filter((value) => {
                return value[0] >= 0 && value[1] >= 0 && value[0] <= 7 && value[1] <= 7
            })

            return queenAvailableCoordinates

        case "pawn":
            if (piece.color == "white") {
                const whitePawnCoordinates = [[x, y + 1], [x - 1, y + 1], [x + 1, y + 1]]
                if (y == 1) {
                    whitePawnCoordinates.push([x, y + 2])
                }

                const whitePawnAvailableCoordinates = whitePawnCoordinates.filter((value) => {
                    return value[0] >= 0 && value[1] >= 0 && value[0] <= 7 && value[1] <= 7
                })

                return whitePawnAvailableCoordinates
            }
            if (piece.color == "black") {
                const blackPawnCoordinates = [[x, y - 1], [x - 1, y - 1], [x + 1, y - 1]]
                if (y == 6) {
                    blackPawnCoordinates.push([x, y - 2])
                }

                const blackPawnAvailableCoordinates = blackPawnCoordinates.filter((value) => {
                    return value[0] >= 0 && value[1] >= 0 && value[0] <= 7 && value[1] <= 7
                })

                return blackPawnAvailableCoordinates
            }
    }

    // const move = [[x - 1, y - 1], [x, y - 1], [x + 1, y - 1],
    // [x - 1, y], [x + 1, y],
    // [x - 1, y + 1], [x, y + 1], [x + 1, y + 1]
    // ]

    // const availableMove = move.filter((value) => {
    //     return value[0] >= 0 && value[1] >= 0 && value[0] <= 7 && value[1] <= 7
    // })

    // return availableMove
}

export function deleteAvailableMove(cells) {
    cells.forEach(cell => {
        if (cell.cellElement.classList.contains("available")) {
            cell.cellElement.classList.remove("available")
        }
    })
}

export function deleteBlockedMove(piece, pieces, coordinates, lastMovedPiece) {
    // lastMovedPiece nhằm tìm nước tốt vừa mới đi để bắt tốt ngang đường
    let topLeftBlocked = false
    let topRightBlocked = false
    let botLeftBlocked = false
    let botRightBlocked = false
    let topBlocked = false
    let botBlocked = false
    let leftBlocked = false
    let rightBlocked = false
    const leftCastlingMoves = []
    const rightCastlingMoves = []
    const availableCoordinates = []

    if (piece.type == "bishop") {
        coordinates.forEach(arr => {
            // chéo lên trái
            if (piece.x - arr[0] > 0 && piece.y - arr[1] > 0) {
                // console.log(arr[0], arr[1])
                if (findPiece(pieces, arr[0], arr[1]) == undefined) {
                    if (topLeftBlocked == false) {
                        availableCoordinates.push(arr)
                    }
                }

                else {
                    if (piece.color == findPiece(pieces, arr[0], arr[1]).color) {
                        topLeftBlocked = true
                    } else {
                        if (topLeftBlocked == false) {
                            availableCoordinates.push(arr)
                            topLeftBlocked = true
                        }
                    }
                }
            }

            // chéo lên phải
            if (piece.x - arr[0] < 0 && piece.y - arr[1] > 0) {
                // console.log(arr[0], arr[1])
                if (findPiece(pieces, arr[0], arr[1]) == undefined) {
                    if (topRightBlocked == false) {
                        availableCoordinates.push(arr)
                    }
                }

                else {
                    if (piece.color == findPiece(pieces, arr[0], arr[1]).color) {
                        topRightBlocked = true
                    } else {
                        if (topRightBlocked == false) {
                            availableCoordinates.push(arr)
                            topRightBlocked = true
                        }
                    }
                }
            }

            // chéo xuống trái
            if (piece.x - arr[0] > 0 && piece.y - arr[1] < 0) {
                // console.log(arr[0], arr[1])
                if (findPiece(pieces, arr[0], arr[1]) == undefined) {
                    if (botLeftBlocked == false) {
                        availableCoordinates.push(arr)
                    }
                }

                else {
                    if (piece.color == findPiece(pieces, arr[0], arr[1]).color) {
                        botLeftBlocked = true
                    } else {
                        if (botLeftBlocked == false) {
                            availableCoordinates.push(arr)
                            botLeftBlocked = true
                        }
                    }
                }
            }

            // chéo xuống phải
            if (piece.x - arr[0] < 0 && piece.y - arr[1] < 0) {
                // console.log(arr[0], arr[1])
                if (findPiece(pieces, arr[0], arr[1]) == undefined) {
                    if (botRightBlocked == false) {
                        availableCoordinates.push(arr)
                    }
                }

                else {
                    if (piece.color == findPiece(pieces, arr[0], arr[1]).color) {
                        botRightBlocked = true
                    } else {
                        if (botRightBlocked == false) {
                            availableCoordinates.push(arr)
                            botRightBlocked = true
                        }
                    }
                }
            }
        })

        return availableCoordinates
    }

    if (piece.type == "rook") {
        coordinates.forEach(arr => {
            // đi lên
            if (piece.x == arr[0] && piece.y - arr[1] > 0) {
                if (findPiece(pieces, arr[0], arr[1]) == undefined) {
                    if (topBlocked == false) {
                        availableCoordinates.push(arr)
                    }
                }
                else {
                    if (piece.color == findPiece(pieces, arr[0], arr[1]).color) {
                        topBlocked = true
                    } else {
                        if (topBlocked == false) {
                            availableCoordinates.push(arr)
                            topBlocked = true
                        }
                    }
                }
            }

            // đi xuống
            if (piece.x == arr[0] && piece.y - arr[1] < 0) {
                if (findPiece(pieces, arr[0], arr[1]) == undefined) {
                    if (botBlocked == false) {
                        availableCoordinates.push(arr)
                    }
                }
                else {
                    if (piece.color == findPiece(pieces, arr[0], arr[1]).color) {
                        botBlocked = true
                    } else {
                        if (botBlocked == false) {
                            availableCoordinates.push(arr)
                            botBlocked = true
                        }
                    }
                }
            }

            // qua trái
            if (piece.x - arr[0] > 0 && piece.y == arr[1]) {
                if (findPiece(pieces, arr[0], arr[1]) == undefined) {
                    if (leftBlocked == false) {
                        availableCoordinates.push(arr)
                    }
                }
                else {
                    if (piece.color == findPiece(pieces, arr[0], arr[1]).color) {
                        leftBlocked = true
                    } else {
                        if (leftBlocked == false) {
                            availableCoordinates.push(arr)
                            leftBlocked = true
                        }
                    }
                }
            }

            // qua phải
            if (piece.x - arr[0] < 0 && piece.y == arr[1]) {
                if (findPiece(pieces, arr[0], arr[1]) == undefined) {
                    if (rightBlocked == false) {
                        availableCoordinates.push(arr)
                    }
                }
                else {
                    if (piece.color == findPiece(pieces, arr[0], arr[1]).color) {
                        rightBlocked = true
                    } else {
                        if (rightBlocked == false) {
                            availableCoordinates.push(arr)
                            rightBlocked = true
                        }
                    }
                }
            }
        })

        return availableCoordinates
    }

    if (piece.type == "queen") {
        coordinates.forEach(arr => {
            // chéo lên trái
            if (piece.x - arr[0] > 0 && piece.y - arr[1] > 0) {
                // console.log(arr[0], arr[1])
                if (findPiece(pieces, arr[0], arr[1]) == undefined) {
                    if (topLeftBlocked == false) {
                        availableCoordinates.push(arr)
                    }
                }

                else {
                    if (piece.color == findPiece(pieces, arr[0], arr[1]).color) {
                        topLeftBlocked = true
                    } else {
                        if (topLeftBlocked == false) {
                            availableCoordinates.push(arr)
                            topLeftBlocked = true
                        }
                    }
                }
            }

            // chéo lên phải
            if (piece.x - arr[0] < 0 && piece.y - arr[1] > 0) {
                // console.log(arr[0], arr[1])
                if (findPiece(pieces, arr[0], arr[1]) == undefined) {
                    if (topRightBlocked == false) {
                        availableCoordinates.push(arr)
                    }
                }

                else {
                    if (piece.color == findPiece(pieces, arr[0], arr[1]).color) {
                        topRightBlocked = true
                    } else {
                        if (topRightBlocked == false) {
                            availableCoordinates.push(arr)
                            topRightBlocked = true
                        }
                    }
                }
            }

            // chéo xuống trái
            if (piece.x - arr[0] > 0 && piece.y - arr[1] < 0) {
                // console.log(arr[0], arr[1])
                if (findPiece(pieces, arr[0], arr[1]) == undefined) {
                    if (botLeftBlocked == false) {
                        availableCoordinates.push(arr)
                    }
                }

                else {
                    if (piece.color == findPiece(pieces, arr[0], arr[1]).color) {
                        botLeftBlocked = true
                    } else {
                        if (botLeftBlocked == false) {
                            availableCoordinates.push(arr)
                            botLeftBlocked = true
                        }
                    }
                }
            }

            // chéo xuống phải
            if (piece.x - arr[0] < 0 && piece.y - arr[1] < 0) {
                // console.log(arr[0], arr[1])
                if (findPiece(pieces, arr[0], arr[1]) == undefined) {
                    if (botRightBlocked == false) {
                        availableCoordinates.push(arr)
                    }
                }

                else {
                    if (piece.color == findPiece(pieces, arr[0], arr[1]).color) {
                        botRightBlocked = true
                    } else {
                        if (botRightBlocked == false) {
                            availableCoordinates.push(arr)
                            botRightBlocked = true
                        }
                    }
                }
            }

            // đi lên
            if (piece.x == arr[0] && piece.y - arr[1] > 0) {
                if (findPiece(pieces, arr[0], arr[1]) == undefined) {
                    if (topBlocked == false) {
                        availableCoordinates.push(arr)
                    }
                }
                else {
                    if (piece.color == findPiece(pieces, arr[0], arr[1]).color) {
                        topBlocked = true
                    } else {
                        if (topBlocked == false) {
                            availableCoordinates.push(arr)
                            topBlocked = true
                        }
                    }
                }
            }

            // đi xuống
            if (piece.x == arr[0] && piece.y - arr[1] < 0) {
                if (findPiece(pieces, arr[0], arr[1]) == undefined) {
                    if (botBlocked == false) {
                        availableCoordinates.push(arr)
                    }
                }
                else {
                    if (piece.color == findPiece(pieces, arr[0], arr[1]).color) {
                        botBlocked = true
                    } else {
                        if (botBlocked == false) {
                            availableCoordinates.push(arr)
                            botBlocked = true
                        }
                    }
                }
            }

            // qua trái
            if (piece.x - arr[0] > 0 && piece.y == arr[1]) {
                if (findPiece(pieces, arr[0], arr[1]) == undefined) {
                    if (leftBlocked == false) {
                        availableCoordinates.push(arr)
                    }
                }
                else {
                    if (piece.color == findPiece(pieces, arr[0], arr[1]).color) {
                        leftBlocked = true
                    } else {
                        if (leftBlocked == false) {
                            availableCoordinates.push(arr)
                            leftBlocked = true
                        }
                    }
                }
            }

            // qua phải
            if (piece.x - arr[0] < 0 && piece.y == arr[1]) {
                if (findPiece(pieces, arr[0], arr[1]) == undefined) {
                    if (rightBlocked == false) {
                        availableCoordinates.push(arr)
                    }
                }
                else {
                    if (piece.color == findPiece(pieces, arr[0], arr[1]).color) {
                        rightBlocked = true
                    } else {
                        if (rightBlocked == false) {
                            availableCoordinates.push(arr)
                            rightBlocked = true
                        }
                    }
                }
            }
        })

        return availableCoordinates
    }

    if (piece.type == "knight") {
        coordinates.forEach(arr => {
            if (findPiece(pieces, arr[0], arr[1]) != undefined) {
                if (piece.color != findPiece(pieces, arr[0], arr[1]).color) {
                    availableCoordinates.push(arr)
                }
            } else {
                availableCoordinates.push(arr)
            }
        })

        return availableCoordinates
    }

    if (piece.type == "king") {
        coordinates.forEach(arr => {
            if (Math.abs(piece.x - arr[0]) >= 2 || Math.abs(piece.y - arr[1]) >= 2) {
                // qua trai
                if (piece.x - arr[0] > 0 && piece.y == arr[1]) {
                    if (findPiece(pieces, arr[0], arr[1]) == undefined) {
                        if (leftBlocked == false) {
                            leftCastlingMoves.push(arr)
                        }
                    }
                    else {
                        leftBlocked = true
                    }
                }

                //qua phai
                if (piece.x - arr[0] < 0 && piece.y == arr[1]) {
                    if (findPiece(pieces, arr[0], arr[1]) == undefined) {
                        if (rightBlocked == false) {
                            if (Math.abs(piece.x - arr[0]) != 3) {
                                rightCastlingMoves.push(arr)
                            }
                        }
                    }
                    else {
                        rightBlocked = true
                    }
                }
            } else {
                if (findPiece(pieces, arr[0], arr[1]) != undefined) {
                    //
                    //qua trai
                    if (piece.x - arr[0] > 0 && piece.y == arr[1]) {
                        leftBlocked = true
                    }

                    //qua phai
                    if (piece.x - arr[0] < 0 && piece.y == arr[1]) {
                        rightBlocked = true
                    }
                    //
                    if (piece.color != findPiece(pieces, arr[0], arr[1]).color) {
                        availableCoordinates.push(arr)
                    }
                } else {
                    availableCoordinates.push(arr)
                }
            }
        })

        if (leftBlocked == false) {
            availableCoordinates.push(...leftCastlingMoves)
        }

        if (rightBlocked == false) {
            availableCoordinates.push(...rightCastlingMoves)
        }

        return availableCoordinates
    }

    if (piece.type == "pawn") {
        if (piece.color == "white") {
            coordinates.forEach(arr => {
                //nước tiến về phía trước
                if (piece.x == arr[0] && piece.y - arr[1] < 0) {
                    if (findPiece(pieces, arr[0], arr[1]) == undefined) {
                        if (topBlocked == false) {
                            availableCoordinates.push(arr)
                        }
                    } else {
                        topBlocked = true
                    }
                }
                // các nước đi chéo
                else {
                    if (findPiece(pieces, arr[0], arr[1]) != undefined) {
                        if (piece.color != findPiece(pieces, arr[0], arr[1]).color) {
                            availableCoordinates.push(arr)
                        }
                    }
                    // bat tot ngang duong
                    else {
                        if (piece.y == 4) {
                            if (findPiece(pieces, arr[0], arr[1] - 1) != undefined) {
                                console.log(findPiece(pieces, arr[0], arr[1] - 1))

                                if (findPiece(pieces, arr[0], arr[1] - 1).type == "pawn" &&
                                    findPiece(pieces, arr[0], arr[1] - 1).color == "black" &&
                                    findPiece(pieces, arr[0], arr[1] - 1) == lastMovedPiece) {
                                    availableCoordinates.push(arr)
                                }
                            }
                        }

                    }
                }
            })
        }

        if (piece.color == "black") {
            coordinates.forEach(arr => {
                //nước tiến về phía trước
                if (piece.x == arr[0] && piece.y - arr[1] > 0) {
                    if (findPiece(pieces, arr[0], arr[1]) == undefined) {
                        if (topBlocked == false) {
                            availableCoordinates.push(arr)
                        }
                    } else {
                        topBlocked = true
                    }
                }
                // các nước đi chéo
                else {
                    if (findPiece(pieces, arr[0], arr[1]) != undefined) {
                        if (piece.color != findPiece(pieces, arr[0], arr[1]).color) {
                            availableCoordinates.push(arr)
                        }
                    }
                    // bat tot ngang duong
                    else {
                        if (piece.y == 3) {
                            if (findPiece(pieces, arr[0], arr[1] + 1) != undefined) {
                                console.log(findPiece(pieces, arr[0], arr[1] + 1))
                                if (findPiece(pieces, arr[0], arr[1] + 1).type == "pawn" &&
                                    findPiece(pieces, arr[0], arr[1] + 1).color == "white" &&
                                    findPiece(pieces, arr[0], arr[1] + 1) == lastMovedPiece) {
                                    availableCoordinates.push(arr)
                                }
                            }
                        }
                    }
                }
            })
        }

        return availableCoordinates
    }
}

export function checkAvailableCheckMove(pieces, lastMovedPiece, color) {
    return pieces.filter(piece => {
        return deleteBlockedMove(piece, pieces, findAvailableMove(piece, piece.x, piece.y, pieces), lastMovedPiece).filter(arr => {
            return findPiece(pieces, arr[0], arr[1]) != undefined && findPiece(pieces, arr[0], arr[1]).type == "king" && findPiece(pieces, arr[0], arr[1]).color != color
        }).length != 0 && piece.color == color
    })
}

export function findPieceByTypeAndColor(pieces, type, color) {
    return pieces.filter(piece => {
        return piece.type == type && piece.color == color
    })[0]
}
