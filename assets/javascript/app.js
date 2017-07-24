$(document).ready(function() {
	var correctAnswersCount = 0;
	var incorrectAnswersCount = 0;
	var unansweredAnswersCount = 0;
	
	var secondsLeft = 30;

	var answerKey = {
		1: "The Lion King",
		2: "The Lion King"
	};
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
		secondsLeft = 100;
		$(".time-remaining").text(secondsLeft);

		var timeRemainingHandle = setInterval(function() {
			secondsLeft--;
			$(".time-remaining").text(secondsLeft);
			if(secondsLeft <= 0) {
				clearInterval(timeRemainingHandle);
				endGame();
			}
		}, 1000);
			
		$(".start").hide();
		$(".results").hide();
		$(".trivia-game-view").show();
	}
	function endGame() {
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
			var expectedAnswer = answerKey[key + 1];
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
});
