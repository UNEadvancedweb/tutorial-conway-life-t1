# Tutorial 1

For the first tutorial, we're just going to work with JavaScript ES5 (plus `let`) and the DOM API.

As you'll see later, what we're doing has similar principles to the way modern web frameworks work &mdash; we're going to synchronise a JavaScript array with what is showing on the screen. But we're going to do it manually.

## Clone the code

First, get the code and put it somewhere you can load it in your browser. If you are working on turing (our student development machine), you can put it inside a folder in your `public_html` directory and access it from http://turing.une.edu.au/~yourusername/yourpath

If you're working locally, you can install a web server, or you can run the [examples server](https://github.com/UNEadvancedweb/client-example-server-p4s) written in Play &mdash; a framework you'll see later in the unit.

To get the code, open a terminal, `cd` into the public directory of whichever webserver you are using, and:

```sh
git clone git@github.com:UNEadvancedweb/tutorial-conway-life-t1.git
```

This will clone this code using the git version control system. That will, amongst other things, let you switch between different branches (eg, the solution and the start of the exercise)

## Checkout the *solution*

First, just to check everything is working, check out the solution to this part:

```sh
git checkout solution
```

Now open index.html in your web browser. You should be shown a grid of dots and a Step button. Clicking on a dot should turn it into a hash. Try drawing some shapes and clicking step to step the game of life forward.

## Checkout the *master* branch

Let's now check out the master branch to get back to the beginning of the exercise

```sh
git checkout master
```

Now hit refresh in the browser, and you should find yourself faced with a disappointingly empty screen.

Time to open the code. I recommedn Visual Studio Code as an editor for this.

Take a look in gameOfLife.js and see the game itself. Have a look at how it's implemented, and what functions are available.

Then take a look in index.html. This contains a `div` element where the game board is going to be rendered:

```html
<div id="game" style="font-family: monospace; cursor: pointer;">
</div>
```

It also loads the JavaScript files and does some initialisation.

```html
  <script src="gameOfLife.js"></script>
  <script src="render.js"></script>
  <script>
    gameOfLife.emptyBoard()
    render()
  </script>
```

However, `render()` is not implemented. Your first task in the tutorial is to implement `render`.

### Implementing `render`

First, let's blank the contents of the board. Get a reference to the game element:

```js
    let gameDiv = document.getElementById("game")
```

We can delete its contents quickly by setting its `innerHTML` blank:

```js
    gameDiv.innerHTML = ""
```

Next, we're going to loop across every cell in the game and create a new element for it. We'll create a `div` element for every row, and within each row, we'll create a `span` element for every cell.

This means we'll need to make the outer loop do the rows (the Y axis), so a basic loop (not doing anything) would be:

```js
    for (let y = 0; y < gameOfLife.getH(); y++) {
        for (let x = 0; x < gameOfLife.getW(); x++) {
        }
    }
```

Now, within the code, first create a `div` for each row.

Save your code, reload it in the browser, and inspect the HTML to see if the row divs were created. (They'll be empty so you'll need to inspect the HTML to see them.)

Next, in the inner loop, create a `span` element for each cell.

Again, reload your code to see if that worked.

Next, if the cell is alive, put a text node of `#` in the `span`. Otherwise put a `.` in the span. You can discover if a cell is alive by calling `gameOfLife.isAlive(x, y)`.

Reload your code and see if it works. You should see a grid of dots, because initially none of the cells are alive.

### Adding an event handler

Let's wire up an event handler so that clicking a cell will toggle its alive state.

Inside the innermost loop, create an event handler:

```js
            let handler = function(evt) {
                gameOfLife.toggleCell(x, y)
                render()
            }
```

And attach this handler to listen to the `mousedown` event on the span element.

```js
            span.addEventListener("mousedown", handler)
```

Reload your code and see if clicking cells toggles them.

Next, let's wire the button up to step the game forward. In index.html, give the button an `onclick` attribute:

```html
onclick="javascript: { gameOfLife.stepGame(); render(); }"
```

Reload, and see if you can draw patterns and step the game.

### The problem with var

Just to reinforce the difference between `var` and `let` in JavaScript, edit your nested for-loops in render.js to

```js
    for (var y = 0; y < gameOfLife.getH(); y++) {
        // etc

        for (var x = 0; x < gameOfLife.getW(); x++) {
            // etc
        }
    }
```

Reload, and you should find the game no longer works.

Set a breakpoint in the event handler, and add a watch expression on `y` and `x`. No matter which cell you click, `y` and `x` are the same and one larger than the maximum index of the board. Because we used `var`, `x` and `y` in the loop have *function scope* instead of *block scope*, and every event handler is using the same variable.

Best reset that to use `let` and block scope so it works again!

### Conclusion

What we've done manually in this tutorial is render some elements based on some data held in JavaScript. Our event handlers call functions that update our *JavaScript game state*, and then we re-render the HTML based on the state of that JavaScript data.

In principle, this is very similar to how many modern web frameworks work -- you design your code to update data in plain-old JavaScript objects, and then the framework synchronises the HTML elements to match the data.

However, we're doing this manually, and it's quite a lot of code that doesn't look like HTML. For example:

```js
        let row = document.createElement("div")
        row.setAttribute("class", "gamerow")
        gameDiv.appendChild(row)
```

When we introduce client-side frameworks, they will let us describe how to render our HTML from our JavaScript state in ways that look more component-oriented and use friendlier notations.

