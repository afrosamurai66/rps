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
	iconClasses = {
		rock: 'fa fa-3x fa-cube',
		paper: 'fa fa-3x fa-file-o',
		scissors: 'fa fa-3x fa-cut'
	},
	userChoice = null,
	computerChoice = null,
	winner = null;

	// display result icons and color background
	var setResultClasses = function() {
		// set icons
		$('#human-choice').attr('class', iconClasses[userChoice]);
		$('#computer-choice').attr('class', iconClasses[computerChoice]);
		
		// set background
		if ( winner === 'user' ) {
			$('#result-alert').removeClass('alert-danger alert-warning').addClass('alert-success');
		}
		else if ( winner === 'computer' ) {
			$('#result-alert').removeClass('alert-success alert-warning').addClass('alert-danger');
		}
		else {
			$('#result-alert').removeClass('alert-danger alert-success').addClass('alert-warning');
		}
	};

	// get & save computer's choice
	var getComputerChoice = function() {
		// select a random choice
		computerChoice = choices[Math.floor(Math.random()*choices.length)];
	};

	// compare choices to see who won
	var compareChoices = function() {
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
		updateScores();
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
	var updateScores = function() {
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
			userChoice = $(this).attr('data-choice');
			getComputerChoice();
			compareChoices();
			setResultClasses();
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