function getNumberOfStartingClues(difficulty) {
	difficulty = switchDifficulty(difficulty);
	
	switch (difficulty) {
		case 1: return randomNumberBetween(36, 46);
		case 2: return randomNumberBetween(32, 35);
		case 3: return randomNumberBetween(28, 31);
		case 4: return randomNumberBetween(17, 27);

		default: return randomNumberBetween(32, 35);
	}	
}

function randomNumberBetween(min, max) {
	min = Math.ceil(min);
  	max = Math.floor(max);
  	return Math.floor(Math.random() * (max - min) + min);
}

function switchDifficulty(difficulty) {
	// easy case to avoid checking uneccesary things
	if ((!isNaN(difficulty)) && (difficulty >= 1 && difficulty <= 4)) {
		return difficulty;
	}

	if (isNaN(difficulty)) {
		difficulty = difficulty.toLowerCase();

		switch (difficulty.toLowerCase()) {
			case "easy": difficulty = 1; break;
			case "medium": difficulty = 2; break;
			case "hard": difficulty = 3; break;
			case "expert": difficulty = 4; break;

			default: difficulty = 2;
		}
	}

	if (difficulty < 1) {
		difficulty = 1;
	}

	if (difficulty > 4) {
		difficulty = 4;
	}

	return difficulty;
}