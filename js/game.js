$(function() {
	// run this code when page is done loading

	// variables: choices, scores, etc.
	var scores = {
		user: 0,
		computer: 0,
		draw: 0
	},
	choices = [
		"rock",
		"paper",
		"scissors" 
	],
	userChoice = null,
	computerChoice = null;

	// get & save user's choice
	var getUserChoice = function( choice ) {
		userChoice = choice;
		$('#human-choice').addClass('fa-' + userChoice);
	};

	// get & save computer's choice
	var getComputerChoice = function() {
		// select a random choice
		computerChoice = choices[Math.floor(Math.random()*choices.length)];
			$('#computer-choice').addClass('fa-' + computerChoice);
	};

	// compare choices to see who won
	var compareChoices = function() {
		console.log(userChoice, computerChoice);
		if ( userChoice === computerChoice ) {
			// draw
			winner = 'draw';
		}
		else if ( userChoice === 'rock' && computerChoice === 'paper' ) {
			winner = 'computer';
		}
		else if ( userChoice === 'rock' && computerChoice === 'scissors') {
			winner = 'user';
		}
		else if ( userChoice === 'paper' && computerChoice === 'rock' ) {
			winner = 'user';
		}
		else if ( userChoice === 'paper' && compareChoices === 'scissors' ) {
			winner = 'computer';
		}
		else if ( userChoice === 'scissors' && computerChoice === 'paper' ) {
			winner = 'user';
		}
		else if ( userChoice === 'scissors' && computerChoice === 'rock' ) {
			winner = 'computer';
		}
		updateScores( winner );
	};

	var resetChoices = function() {
		userChoice = null;
		computerChoice = null;
	};

	// show/hide choices
	var toggleChoices = function() {
		$('#choices').toggle();
	};

	// show/hide results
	var toggleResults = function() {
		$('#results').toggle();
	};

	// update scores
	var updateScores = function( winner ) {
		if ( winner === 'user' ) {
			scores.user += 1;
			$('#human-score').html(scores.user);
		}
		else if ( winner === 'computer' ) {
			scores.computer += 1;
			$('#computer-score').html(scores.computer);
		}
		else {
			scores.draw += 1;
			$('#tie-score').html(scores.draw);
		}
	};

	// handle click events
	var setupEvents = function() {
		// handle choice button click
		$('.choice').on('click', function(e) {
			getUserChoice( $(this).attr('data-choice') );
			getComputerChoice();
			compareChoices();
			toggleChoices();
			toggleResults();
		});

		$('#play-again').on('click', function() {
			resetChoices();
			toggleResults();
			toggleChoices();
		});

	};

	var init = function() {
		setupEvents();
	};


	init();
});