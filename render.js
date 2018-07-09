"use strict";

function render() {

    let gameDiv = document.getElementById("game")
    gameDiv.innerHTML = ""

    for (let y = 0; y < gameOfLife.getH(); y++) {
        let row = document.createElement("div")
        row.setAttribute("class", "gamerow")
        gameDiv.appendChild(row)

        for (let x = 0; x < gameOfLife.getW(); x++) {
            let t = document.createElement("span")

            if (gameOfLife.isAlive(x, y)) {
                t.innerHTML = "#"
            } else {
                t.innerHTML = "."
            }

            let handler = function(evt) {
                gameOfLife.toggleCell(x, y)
                render()
            }
                
            t.addEventListener("mousedown", handler)

            row.appendChild(t)
        }
    }

}