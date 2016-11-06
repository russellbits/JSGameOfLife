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
function Cell(id, col, row, maxRow, maxCol, boardObj, cells ) {
	this.cells = cells
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
				this.cells[$(this).attr('id')].state = 1
				this.cells[$(this).attr('id')].stateStr = 'alive'
			
			} else if($(this).attr('class') == 'cell dead-cell') {	
				console.log('You brought a dead cell to life!')
				// become a live cell
				$(this).removeClass('dead-cell').addClass('live-cell')
				this.cells[$(this).attr('id')].state = 1
				this.cells[$(this).attr('id')].stateStr = 'alive'
				
			} else {
				console.log('You killed a living cell!')
				// become a dead cell
				// temp removed animations
				// $(this).removeClass('live-cell').addClass('dead-cell').addClass('animated').addClass('fadeIn');
				$(this).removeClass('live-cell').addClass('dead-cell')
				this.cells[$(this).attr('id')].state = 0
				this.cells[$(this).attr('id')].stateStr = 'dead'
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