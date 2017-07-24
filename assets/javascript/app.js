$(document).ready(function() {
	var correctAnswers = 100;
	var incorrectAnswers = 4;
	var unansweredAnswers = 1;
	$(".start").click(function() {
		startGame();
	});
	$(".finish").click(function() {
		endGame();
	});
	function startGame() {
		$(".start").hide();
		$(".trivia-game-view").show();
	}
	function endGame() {
		$(".trivia-game-view").hide();
		$(".results").show();
		fillResultsTable(correctAnswers, incorrectAnswers, unansweredAnswers);
	}
	function fillResultsTable(correctCount, incorrectCount, unansweredCount) {
		$("table.results-table tr.correct td").text(correctCount);
		$("table.results-table tr.incorrect td").text(incorrectCount);
		$("table.results-table tr.unanswered td").text(unansweredCount);
	}
});
