$( document ).ready(function() {
	
	/*
	* Primarty variable describing
	*     the board (number of columns and rows)
	*     an array holding all created cell objects
	*     a limit on how many rounds to run
	*     a global counter for tracking rounds
	*/
	var maxCol = 31;
	var maxRow = 31;
	var cells = [];
	var initDraw = 1;
	var simulationLimit = function() {
		return $('#rounds').val();
	};
	console.log(simulationLimit());
	
	// Set maximum for board size (Note: this may have to change for iPad
	var boardHeight = $(window).height();
	var boardWidth = boardHeight;
	
	// Set the board size and square sizes
	$( '#board' ).css({
					"top":"50px",
					"left":"50px",
					"height":boardHeight,
					"width":boardWidth,
					"margin":"0px auto",
					"border-right":"1px solid #999",
					"border-bottom":"1px solid #999"
					});
	
	// How to divide the above height and width by the col?
	var squareHeight = (boardHeight-maxCol)/maxCol;
	var squareWidth = (boardHeight-maxRow)/maxRow;
	
	/*
	* Attach function to Run Simulation button 
	*/
	$('#run').on('click', function() {
		// Reset round count when pressed
		var roundCount = 0;
		
		// Do this once on run press so we can update the text field.
		var initSimLimit = simulationLimit();
		
		// Update Run button to illustrate simulation in progreess
		$('#run').css({backgroundColor: '#fa05e5'});
		$('#run').val('Running...');
		
		
		function runSimulation() {
			
			// Update rounds field to show current round
			$('#rounds').val(roundCount);
			
			setTimeout(function() {
				if (roundCount++ < initSimLimit) {
					setCellsNextState();
					updateCells();
					runSimulation();
				} else {
					console.log("Stopping simulation.");
					$('#run').css({backgroundColor: '#0576f9'});
					$('#run').val('Run Simulation');
				}
			}, 300); // milliseconds between re-draws
			
		}
		runSimulation();
	});

	/*
	* Attach init() function to Clear All Cells button 
	*/			
	$('#clear').on('click', function() {
		console.log('The clear button has been pressed.');
		clearCells();
		init(squareHeight,squareWidth);
	});
	
	/*
	* Initialization loop for creating cells
	*/			
	function init(squareHeight,squareWidth) {
		
		initDraw = 1;
		
		for(i = 0; i < maxRow; i++) {
		
			for(j = 0; j < maxCol; j++) {
		
				cellID = j+'_'+i;
		
				cells[cellID] = new Cell(cellID,j,i);
		
				cells[cellID].create(squareHeight,squareWidth);
		
			}
		
		}
	
	}
	
	// Run once at load
	init(squareHeight,squareWidth);
	
	/*
	* Removal function for clearing cells
	*/
	function clearCells() {
		for(i = 0; i < maxRow; i++) {
			for(j = 0; j < maxCol; j++) {
				cellID = '#'+j+'_'+i;
				$(cellID).remove();
			}
		}
	}
	
	/*
	*
	* Object constructor for cells
	*     
	* Each object knows its position on the board (relatively) and    
	* and can check its array of 8 neighbors to in turn check their
	* health. The Game of Life works dependent on rules about the
	* health of neighbors. (For specific rules, see readme.md)
	* 
	*/		
	function Cell(id, col, row ) {
		this.position = [ col, row ];
		this.id = id;
		this.state = 0;
		this.nextState = 0;
		this.stateStr = 'dead';
		this.neighbors = constructNeighborArray(this.position[0],this.position[1]);
		
		this.livingNeighborCount = function() {
			var livingNeighbors = 0;
			
			for (var n = 0; n < this.neighbors.length; n++) {
			
				if(cells[this.neighbors[n]].state == 1) {
					livingNeighbors++;
				}
			}
			
			console.log('Returning living neighbor count: ' + livingNeighbors)
			return livingNeighbors;
		};
							
		this.create = function(squareHeight, squareWidth) {
			$('<div>', { 
				id: this.id,
				class: 'cell',
				state: '0'})
			.css({
				"height":squareHeight,
				"width":squareWidth,
			})
			.appendTo("#board")
			.on('click', function() {
				if($(this).attr('class') == 'cell') {
					console.log('You clicked on an empty cell');
					// start a live cell
					// temp removed animations
					$(this).removeClass('dead-cell').addClass('live-cell');
					cells[$(this).attr('id')].state = 1
					cells[$(this).attr('id')].stateStr = 'alive'
				
				} else if($(this).attr('class') == 'cell dead-cell') {	
					console.log('You brought a dead cell to life!');
					// become a live cell
					$(this).removeClass('dead-cell').addClass('live-cell');	
					cells[$(this).attr('id')].state = 1;
					cells[$(this).attr('id')].stateStr = 'alive';
					
				} else {
					console.log('You killed a living cell!');
					// become a dead cell
					// temp removed animations
					// $(this).removeClass('live-cell').addClass('dead-cell').addClass('animated').addClass('fadeIn');
					$(this).removeClass('live-cell').addClass('dead-cell');	
					cells[$(this).attr('id')].state = 0;
					cells[$(this).attr('id')].stateStr = 'dead';
				}
				// cells[this.id].respond();
			});
		};
		
		this.changeCellView = function() {
			console.log($(this));

			if(this.state == 1) {
				// draw a live cell
				// temp removed animations
				// $('#'+this.id).removeClass('dead-cell').addClass('live-cell').addClass('animated').addClass('bounceIn');
				console.log('Live!');
				$('#'+this.id).removeClass('dead-cell').addClass('live-cell');
			} else {
				// draw a dead cell
				// temp removed animations
				// $('#'+this.id).removeClass('live-cell').addClass('dead-cell').addClass('animated').addClass('fadeIn');
				console.log('Die!');
				$('#'+this.id).removeClass('live-cell').addClass('dead-cell');
			}

		};
		
		/* For debugging - console reports from cell objects
		this.respond = function() {
			console.log('I am cell ' + this.id + ' and I am ' + this.stateStr);
			console.log(
				'My neighbors are \n' +
				'topleft: ' + this.neighbors[0] + '\n' +
				'top: ' + this.neighbors[1] + '\n' +
				'topright: ' + this.neighbors[2] + '\n' +
				'left: ' + this.neighbors[3] + '\n' +
				'right: ' + this.neighbors[4] + '\n' +
				'bottomleft: ' + this.neighbors[5] + '\n' +
				'bottom: ' + this.neighbors[6] +  '\n' +
				'bottomright: ' + this.neighbors[7] +  '.\n' +
				'I have ' + this.livingNeighborCount() + ' living neighbors'
			);
		};
		*/
	}
	
	// Helper function for cells to construct their array of neighbors
	function constructNeighborArray(col,row) {
		// Array order of neighbors: [topleft, top, topright, left, right, bottomleft, bottom, bottomright]
		// For example: 0_0 neighbors: [30_30, 30_0, 30_1, 0_30, 0_1, 1_30, 1_0, 1_1]
		var neighbors = [];
		
		// Board must be a toroid
		var rowUp =    ( row == 0)          ? maxRow-1 : row-1;
		var colLeft =  ( col == 0 ) 		? maxCol-1 : col-1;
		var colRight = ( col == maxCol-1 )  ? 0 : col+1;
		var rowDown =  ( row == maxRow-1 )  ? 0 : row+1;
		
		// top-left is always col -1, row - 1 unless row 0; then row is 30
		neighbors[0] = colLeft + '_' + rowUp;
		// top
		neighbors[1] = col + '_' + rowUp;
		// top-right
		neighbors[2] = colRight + '_' + rowUp;
		// left
		neighbors[3] = colLeft + '_' + row;
		// right
		neighbors[4] = colRight + '_' + row;
		// bottom-left
		neighbors[5] = colLeft + '_' + rowDown;
		// bottom
		neighbors[6] = col + '_' + rowDown;
		// bottom-right
		neighbors[7] = colRight + '_' + rowDown;
		
		return neighbors;
	}
	
	
	// Helper function for cells to apply rules for Game of Life
	// Note: Other automata rules can be applied here for different
	//       simulations, a la Wolfram rules
	function setCellsNextState() {			
		for(i = 0; i < maxRow; i++) {
			for(j = 0; j < maxCol; j++) {
				cellID = j+'_'+i;
				cellHealth = cells[cellID].livingNeighborCount();
				// console.log(cellID + ' health: ' + cellHealth);
				// if statement to check cell's health
				if(cells[cellID].state == 1) {
					if(cellHealth < 2) {
						cells[cellID].nextState = 0;
					} else if(cellHealth == 2 || cellHealth == 3) {
						cells[cellID].nextState = 1;
					} else if(cellHealth > 3) {
						cells[cellID].nextState = 0;
					}	
				} else {
					if(cellHealth == 3) {
						cells[cellID].nextState = 1;
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
					cells[cellID].state = cells[cellID].nextState;
					cells[cellID].changeCellView();
				}
			}
		}
	}
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