$(document).ready(function() {
	const TIMER_SECONDS = 15;
	var correctAnswersCount = 0;
	var incorrectAnswersCount = 0;
	var unansweredAnswersCount = 0;
	
	var secondsLeft = 0;

	var timeRemainingHandle = null;


	var triviaQuestionsCollection = {
		"hawaiiQuestion": {
			"question": "What is the name of the animated science fiction comedy-drama film released in 2002 about a Hawaiin girl and her unusual pet?",
			"answer": "Lilo & Stitch",
			"otherOptionsArray": ["Moana", "Lava", "Sabastian of Maui"]
		},
		"starWarsQuestion": {
			"question": "In the Star Wars universe, who is Luke Skywalker's mother?",
			"answer": "Padmé Amidala",
			"otherOptionsArray": ["Aayla Secura", "Ania Solo", "Mara Jade", "Maz Kanata", "Ahsoka Tano"]	
		},
		"lordOfTheRingsQuestion": {
			"question": "In the \"Lord of the Rings\" film series which actor plays the character of Saruman?",
			"answer": "Christopher Lee",
			"otherOptionsArray": ["Ian McKellen", "Sylvester McCoy"]
		},
		"spaceOdysseyQuestion": {
			"question": "Who were the two writers of the screenplay for the 1968 film \"2001: A Space Odyssey\"?",
			"answer": "Stanley Kubrick & Arthur C. Clarke",
			"otherOptionsArray": ["Robert Rodriguez & Ray Bradbury", "Robert A. Heinlein & Isaac Asimov", "Stephen King & George R. R. Martin"]
		},
		"starTrekYearQuestion": {
			"question": "Star Trek: The Next Generation originally aired in what year?",
			"answer": "1987",
			"otherOptionsArray": ["1982", "1993", "1989"]
		}
	};
	setupQuestions();
	$(".start").click(function() {
		startGame();
	});
	$(".reset").click(function() {
		startGame();
	});
	$(".finish").click(function() {
		endGame();
	});
	function startGame() {
		correctAnswersCount = 0;
		incorrectAnswersCount = 0;
		unansweredAnswersCount = 0;
		secondsLeft = TIMER_SECONDS;
		$(".time-remaining").text(secondsLeft);

		timeRemainingHandle = setInterval(function() {
			if(secondsLeft <= 0) {
				endGame();
			}
			secondsLeft--;
			$(".time-remaining").text(secondsLeft);
		}, 1000);

		$(".start").hide();
		$(".results").hide();
		$(".trivia-game-view").show();
	}
	function endGame() {
		clearInterval(timeRemainingHandle);
		$(".trivia-game-view").hide();
		tallyScores();
		fillResultsTable(correctAnswersCount, incorrectAnswersCount, unansweredAnswersCount);
		$(".results").show();
	}
	function fillResultsTable(correctCount, incorrectCount, unansweredCount) {
		$("table.results-table tr.correct td").text(correctCount);
		$("table.results-table tr.incorrect td").text(incorrectCount);
		$("table.results-table tr.unanswered td").text(unansweredCount);
	}
	function tallyScores() {
		$(".trivia-question").each(function(key, value) {
			var $chosenInputRadio = $(value).find("input:checked");
			var expectedAnswer = triviaQuestionsCollection[$(value).attr("name")].answer;
			if(typeof expectedAnswer !== "undefined") {
				if(expectedAnswer == $chosenInputRadio.val()) {
					correctAnswersCount++;
				} else if($chosenInputRadio.length == 0) {
					unansweredAnswersCount++;
				} else {
					incorrectAnswersCount++;
				}
			}
		});
	}
	function setupQuestions() {
		$triviaQuestionsContainer = $(".trivia-questions-container");
		$.each(triviaQuestionsCollection, function(questionKey, triviaQuestion) {
			var $triviaQuestion = $("<div>").addClass("trivia-question").attr("name", questionKey);
			var $question = $("<p>").addClass("question-text").text(triviaQuestion.question);
			$question.appendTo($triviaQuestion);
			var $questionOptionsForm = $("<form>");
			var fullOptionsArray = triviaQuestion.otherOptionsArray;
			fullOptionsArray.push(triviaQuestion.answer);
			shuffle(fullOptionsArray);
			$.each(triviaQuestion.otherOptionsArray, function(key, value) {
				var $triviaOption = $("<div>").addClass("trivia-option");
				var $triviaOptionInput = $("<input>").attr("type", "radio")
				.attr("name", questionKey).val(value);
				$triviaOption.append($triviaOptionInput);
				$triviaOption.append(value);
				$triviaOption.appendTo($triviaQuestion);
			});
			$triviaQuestionsContainer.append($triviaQuestion);
		});
	}
	function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

		    // Pick a remaining element...
		    randomIndex = Math.floor(Math.random() * currentIndex);
		    currentIndex -= 1;

		    // And swap it with the current element.
		    temporaryValue = array[currentIndex];
		    array[currentIndex] = array[randomIndex];
		    array[randomIndex] = temporaryValue;
		}

		return array;
	}
});
