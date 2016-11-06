(function ( $ ) {
 
    $.fn.golboard = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            backgroundColor: "#6b6efc",
            gridSize: 12, // this is NOT pixel size; this is grid size
            cellSize: 12,
            injectCreature: true,
            creatureDesc: {top: 2, left: 2, creature: [[1,1,1]]},
            runSimBtnID: '#runSimBtn',
            clrSimBtnID: '#clrSimBtn',
            simRounds: 20
        }, options );
		
		// The second settings.gridSize compensates for cell borders
		var boardDimension = String((settings.gridSize * settings.cellSize) + settings.gridSize) + 'px'
		var board = this
		var cells = []
		var maxRow = settings.gridSize
        var maxCol = settings.gridSize
        
		board.css({
			top: '100px',
			left: '100px',
			height: boardDimension,
			width: boardDimension,
			margin: "0px auto",
			borderRight: "1px solid #999",
			borderBottom: "1px solid #999",
			backgroundColor: settings.backgroundColor
		})
        
        console.log('running grid loop')

        for(i = 0; i < maxRow; i++) {
			for(j = 0; j < maxCol; j++) {
				cellID = j+'_'+i
				cells[cellID] = new Cell(cellID, j, i, maxRow, maxCol, board, cells)
				cells[cellID].create(settings.cellSize)
			}
		}
		
		if(settings.injectCreature) {
			// settings.creatureDesc
			var creature = settings.creatureDesc
			console.log(creature.top)
			cells['1_1'].changeCellView()
		}
		
		/**
		 * Interactive functions (UI)
		 **/
		$(settings.runSimBtnID).click(function(event) {
			console.log('Run simulation activated')
			event.preventDefault()
			runSimulation(settings.simRounds)
		});
		
		$(settings.clrSimBtnID).click(function(event) {
			console.log('Clearing the simulation')
			event.preventDefault()
			clearCells()
		});
		
		function runSimulation(roundCount) {
	
			setTimeout(function() {
				if (roundCount++ < 30) {
					setCellsNextState()
					updateCells()
					runSimulation(roundCount)
				} else {
					console.log("Stopping simulation.")
					$(settings.runSimBtnID).css({backgroundColor: '#0576f9'})
					$(settings.runSimBtnID).val('Run Simulation')
			}
			}, 300) // milliseconds between re-draws
		
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
		function Cell(id, col, row, maxRow, maxCol, boardObj ) {
			
			this.position = [ col, row ]
			this.id = id
			this.state = 0
			this.nextState = 0
			this.stateStr = 'dead'
			this.neighbors = constructNeighborArray(this.position[0],this.position[1])
			
			this.livingNeighborCount = function() {
				var livingNeighbors = 0
				
				for (var n = 0; n < this.neighbors.length; n++) {
				
					if(cells[this.neighbors[n]].state == 1) {
						livingNeighbors++
					}
				}
				
				console.log('Returning living neighbor count: ' + livingNeighbors)
				return livingNeighbors
			};
								
			this.create = function(squareDim) {
				$('<div>', { 
					id: this.id,
					class: 'cell',
					state: '0'})
				.css({
					"height":squareDim,
					"width":squareDim,
				})
				.appendTo(boardObj)
				.on('click', function() {
					if($(this).attr('class') == 'cell') {
						console.log('You clicked on an empty cell')
						// start a live cell
						// temp removed animations
						$(this).removeClass('dead-cell').addClass('live-cell')
						cells[$(this).attr('id')].state = 1
						cells[$(this).attr('id')].stateStr = 'alive'
					
					} else if($(this).attr('class') == 'cell dead-cell') {	
						console.log('You brought a dead cell to life!')
						// become a live cell
						$(this).removeClass('dead-cell').addClass('live-cell')
						cells[$(this).attr('id')].state = 1
						cells[$(this).attr('id')].stateStr = 'alive'
						
					} else {
						console.log('You killed a living cell!')
						// become a dead cell
						// temp removed animations
						// $(this).removeClass('live-cell').addClass('dead-cell').addClass('animated').addClass('fadeIn');
						$(this).removeClass('live-cell').addClass('dead-cell')
						cells[$(this).attr('id')].state = 0
						cells[$(this).attr('id')].stateStr = 'dead'
					}
					// cells[this.id].respond()
				});
			};
			
			this.changeCellView = function() {
				console.log($(this))
		
				if(this.state == 1) {
					// draw a live cell
					// temp removed animations
					// $('#'+this.id).removeClass('dead-cell').addClass('live-cell').addClass('animated').addClass('bounceIn');
					console.log('Live!')
					$('#'+this.id).removeClass('dead-cell').addClass('live-cell')
				} else {
					// draw a dead cell
					// temp removed animations
					// $('#'+this.id).removeClass('live-cell').addClass('dead-cell').addClass('animated').addClass('fadeIn');
					console.log('Die!')
					$('#'+this.id).removeClass('live-cell').addClass('dead-cell')
				}
		
			};
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
 
    };
 
}( jQuery ));

/*
* Initialization loop for creating cells
*/			
function init(squareHeight,squareWidth) {

	var initDraw = 1

	for(i = 0; i < maxRow; i++) {
	
		for(j = 0; j < maxCol; j++) {
	
			cellID = j+'_'+i
	
			cells[cellID] = new Cell(cellID,j,i,maxRow,maxCol)
	
			cells[cellID].create(squareHeight,squareWidth)
	
		}
	
	}

}