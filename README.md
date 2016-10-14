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

This code was created in order to demonstrate the OOP program capabilities of Russell Warner.

## Live Demonstration

This code is operating at [http://russellbits.com/labs/GameOfLife](http://russellbits.com/labs/GameOfLife)

## Some Goals
1. Separate command functions out from GOL simulation itself
2. Make it so that any div can have GOL attached to it and the default is no controls, just some basic randomized patterns that repeat
3. Animations for individual cells
4. The ability to insert particular organisms via JSON
5. Object config you can insert into GOL, like cell size vs board size
6. Themes—stylesheets that give different looking boards
