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