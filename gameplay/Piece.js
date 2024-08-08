export default class Piece {
    constructor(type, color){
        this.type = type
        this.color = color
        this.pieceElement = document.createElement("div")
        this.pieceElement.classList.add("piece")
        const img = document.createElement("img")
        img.setAttribute("src", `../../images/pieces/${color}/${type}.png`)
        this.pieceElement.appendChild(img)
        this.firstMove = false
        this.wasChecked = false
    }

    set setX(value){
        this.x = value
        this.pieceElement.style.setProperty("left", `calc(${value} * 8vh)`)
        // this.firstMove = true
    }

    set setY(value){
        this.y = value
        this.pieceElement.style.setProperty("top", `calc(${value} * 8vh)`)
        // this.firstMove = true
    }

    queening() {
        this.type = "queen"
        this.pieceElement.removeChild(this.pieceElement.firstElementChild)
        const img = document.createElement("img")
        img.setAttribute("src", `../../images/pieces/${this.color}/${"queen"}.png`)
        this.pieceElement.appendChild(img)
    }
}