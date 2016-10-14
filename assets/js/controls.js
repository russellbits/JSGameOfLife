
/*
$('#run').on('click', function() {
		// Reset round count when pressed
		var roundCount = 0
		
		// Do this once on run press so we can update the text field.
		var initSimLimit = simulationLimit()
		
		// Update Run button to illustrate simulation in progreess
		$('#run').css({backgroundColor: '#fa05e5'})
		$('#run').val('Running...')
		
		
		function runSimulation() {
			
			// Update rounds field to show current round
			$('#rounds').val(roundCount)
			
			setTimeout(function() {
				if (roundCount++ < initSimLimit) {
					setCellsNextState()
					updateCells()
					runSimulation()
				} else {
					console.log("Stopping simulation.")
					$('#run').css({backgroundColor: '#0576f9'})
					$('#run').val('Run Simulation')
				}
			}, 300) // milliseconds between re-draws
			
		}
		runSimulation()
	});
*/