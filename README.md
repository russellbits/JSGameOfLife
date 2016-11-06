# John Conway's Game of Life (with HTML5 and Javascript)

### Author: Russell Warner ([rewarner@russellbits.com](maito:rewarner@russellbits.com))

## John Conway's Game of Life is an old demonstration of emergence using cellular automata

For more information on John Conway's Game of Life, see the [wikipedia entry](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

## The rules for Game of Life

1. Any live cell with fewer than two live neighbors dies, as if caused by under-population.
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies, as if by overcrowding.
4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

## The HTML5/Javascript demonstration

This code allows any `<div>` within a web page to become a dedicated Game of Life construct. By using Jquery to assign  a `<div>` element in HTML to the Game of Life program, any grid, of any size, with specified cell sizes, can then become a simulation of the Game of Life.

## Updates
This is now a Jquery plugin that allows for the assignment of any `<div>` to act as a game of life simulation. The size of the game itself, as well as the size of the individual cells can now be specified. Additionally, particularly patterns of interest like those found at [catagolue.appspot.com](http://catagolue.appspot.com/)

## Live Demonstration

This code is operating at [http://russellbits.com/labs/GameOfLife](http://russellbits.com/labs/GameOfLife)

## Some Goals
1. Multiple simulations currently run concurrently; they should run independently.
2. Animations for individual cells with a setting for animation true or false
3. Themes—stylesheets that give different looking boards
4. Remove Jquery dependency.
4. ~~Separate command functions out from GOL simulation itself~~
5. ~~Make it so that any div can have GOL attached to it and the default is no controls, just some basic randomized patterns that repeat~~
6. ~~The ability to insert particular organisms via multidimensional arrays~~
7. ~~Object config you can insert into GOL, like cell size vs board size~~
