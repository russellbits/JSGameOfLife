/*
* Primarty variable describing
*     the board (number of columns and rows)
*     an array holding all created cell objects
*     a limit on how many rounds to run
*     a global counter for tracking rounds
*/
var maxCol = 31
var maxRow = 31
var cells = []
var initDraw = 1

// Set maximum for board size (Note: this may have to change for iPad
var boardHeight = $(window).height()
var boardWidth = boardHeight
var roundCount = 0
var simulationLimit = function() {
	return $('#rounds').val()
}

// Do this once on run press so we can update the text field.
var initSimLimit = simulationLimit()

// Set the board size and square sizes
$( '#board' ).css({
	"top":"50px",
	"left":"50px",
	"height":boardHeight,
	"width":boardWidth,
	"margin":"0px auto",
	"border-right":"1px solid #999",
	"border-bottom":"1px solid #999"
})

// How to divide the above height and width by the col?
var squareHeight = (boardHeight-maxCol)/maxCol;
var squareWidth = (boardHeight-maxRow)/maxRow;


(function ( $ ) {
 
    $.fn.rungol = function() {
        $(this).on('click', function() {
	    	// Reset round count when pressed
			// var roundCount = 0
						
			console.log(simulationLimit())
			
			// Update Run button to illustrate simulation in progreess
			$(this).css({backgroundColor: '#fa05e5'})
			
			$(this).val('Running...')
			
			runSimulation(roundCount)
			
	    }
    )}
 
}( jQuery ));



function runSimulation(roundCount) {
	
	setTimeout(function() {
		if (roundCount++ < initSimLimit) {
			setCellsNextState()
			updateCells()
			runSimulation(roundCount)
		} else {
			console.log("Stopping simulation.")
			$('#run').css({backgroundColor: '#0576f9'})
			$('#run').val('Run Simulation')
		}
	}, 300) // milliseconds between re-draws
	
}


/*
* Initialization loop for creating cells
*/			
function init(squareHeight,squareWidth) {

	var initDraw = 1

	for(i = 0; i < maxRow; i++) {
	
		for(j = 0; j < maxCol; j++) {
	
			cellID = j+'_'+i
	
			cells[cellID] = new Cell(cellID,j,i)
	
			cells[cellID].create(squareHeight,squareWidth)
	
		}
	
	}

}

/*
* Removal function for clearing cells
*/
function clearCells() {
	for(i = 0; i < maxRow; i++) {
		for(j = 0; j < maxCol; j++) {
			cellID = '#'+j+'_'+i
			$(cellID).remove()
		}
	}
}

// Helper function for cells to construct their array of neighbors
function constructNeighborArray(col,row) {
	// Array order of neighbors: [topleft, top, topright, left, right, bottomleft, bottom, bottomright]
	// For example: 0_0 neighbors: [30_30, 30_0, 30_1, 0_30, 0_1, 1_30, 1_0, 1_1]
	var neighbors = []
	
	// Board must be a toroid
	var rowUp =    ( row == 0)          ? maxRow-1 : row-1
	var colLeft =  ( col == 0 ) 		? maxCol-1 : col-1
	var colRight = ( col == maxCol-1 )  ? 0 : col+1
	var rowDown =  ( row == maxRow-1 )  ? 0 : row+1
	
	// top-left is always col -1, row - 1 unless row 0; then row is 30
	neighbors[0] = colLeft + '_' + rowUp
	// top
	neighbors[1] = col + '_' + rowUp
	// top-right
	neighbors[2] = colRight + '_' + rowUp
	// left
	neighbors[3] = colLeft + '_' + row
	// right
	neighbors[4] = colRight + '_' + row
	// bottom-left
	neighbors[5] = colLeft + '_' + rowDown
	// bottom
	neighbors[6] = col + '_' + rowDown
	// bottom-right
	neighbors[7] = colRight + '_' + rowDown
	
	return neighbors

}


// Helper function for cells to apply rules for Game of Life
// Note: Other automata rules can be applied here for different
//       simulations, a la Wolfram rules
function setCellsNextState() {			
	for(i = 0; i < maxRow; i++) {
		for(j = 0; j < maxCol; j++) {
			cellID = j+'_'+i
			cellHealth = cells[cellID].livingNeighborCount();
			// console.log(cellID + ' health: ' + cellHealth);
			// if statement to check cell's health
			if(cells[cellID].state == 1) {
				if(cellHealth < 2) {
					cells[cellID].nextState = 0
				} else if(cellHealth == 2 || cellHealth == 3) {
					cells[cellID].nextState = 1
				} else if(cellHealth > 3) {
					cells[cellID].nextState = 0
				}	
			} else {
				if(cellHealth == 3) {
					cells[cellID].nextState = 1
				}
			}
		}
	}
}

// Helper function for looping through all cells and updating their alive/dead state
function updateCells() {
	console.log('Updating cells')
	for(i = 0; i < maxRow; i++) {
		for(j = 0; j < maxCol; j++) {
			cellID = j+'_'+i;
			if(cells[cellID].state != cells[cellID].nextState) { // change in the cell
				console.log('Change in cell state detected.')
				cells[cellID].state = cells[cellID].nextState
				cells[cellID].changeCellView()
			}
		}
	}
}

		
$( document ).ready(function() {
	
	// Attach function to Run Simulation button 
	$('#run').rungol();
	
	// Update rounds field to show current round
	$('#rounds').val(roundCount)

	/*
	 * Attach init() function to Clear All Cells button 
	 */			
	$('#clear').on('click', function() {
		console.log('The clear button has been pressed.')
		clearCells()
		init(squareHeight,squareWidth)
	})
	
	// Run once at load
	init(squareHeight,squareWidth)

// end jquery document ready
});

// This would be nice to add later—a fullscreen version of the game
/*		
// Find the right method, call on correct element
function launchFullScreen(element) {
if(element.requestFullScreen) {
element.requestFullScreen();
} else if(element.mozRequestFullScreen) {
element.mozRequestFullScreen();
} else if(element.webkitRequestFullScreen) {
element.webkitRequestFullScreen();
}
}

// Launch fullscreen for browsers that support it!
launchFullScreen(document.documentElement); // the whole page
launchFullScreen(document.getElementById("videoElement")); // any individual element
*/