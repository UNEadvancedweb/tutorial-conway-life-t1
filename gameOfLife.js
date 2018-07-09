"use strict";

// Our code is wrapped in an anonymous function to keep 
// variables private by default
(function () {

    let h = 20 // height of the board
    let w = 40 // width of the board

    /* 
    The board is represented in memory as a flat array, eg:
    [ 0, 0, 0, 0, 
        0, 0, 0, 0, 
        0, 0, 0, 0 ]
    But we'll initialise its contents in a function.
    */
    let board = []

    // Calculates an index into the board for a given (x, y) location
    function boardIndex(x, y) {
        return y * w + x
    }

    // Zeroes the contents of the board array
    function emptyBoard() {
        for (let x = 0; x < w; x++) {
            for (let y = 0; y < h; y++) {
                board[boardIndex(x, y)] = 0
            }
        }
    }

    // toggles wheter a cell is "alive" or not
    function toggleCell(x, y) {
        let idx = boardIndex(x, y)
        board[idx] = !board[idx]
    }

    // determines whether a cell is alive, dealing with range checks
    function isAlive(x, y) {
        let idx = boardIndex(x, y)
        return (x >= 0) && (y >= 0) && (x < w) && (y < h) && board[idx]
    }

    function liveNeighbours(x, y) {
        let count = 0
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                if (isAlive(i,j) && ((i != x) || (j != y))) {
                    count++
                }
            }
        }
        return count
    }

    // Steps the game forward by a single tick, by calculating the 
    // next state of the board's cells
    function stepGame() {
        let nextBoard = []

        for (var x = 0; x < w; x++) {
            for (let y = 0; y < h; y++) {
                let idx = boardIndex(x, y)
                let alive = isAlive(x, y)
                let neighbours = liveNeighbours(x, y)

                if (
                    (alive && (neighbours == 2 || neighbours == 3)) ||
                    (!alive && neighbours == 3)
                ) {
                    nextBoard[idx] = 1
                } else {
                    nextBoard[idx] = 0
                }
            }
        }

        board = nextBoard
    }

    
    // publish our game on the window object
    window.gameOfLife = {

        getW: function() { return w },

        getH: function() { return h },

        isAlive: isAlive,

        emptyBoard: emptyBoard,

        toggleCell: toggleCell,

        stepGame: stepGame

    }


})()