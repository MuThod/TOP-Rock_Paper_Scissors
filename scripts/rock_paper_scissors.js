let posStrokes = [
	{
		name: "Rock",
		beats: ["Scissors", "Lizard"],
		beatenBy: ["Paper", "Spock"]
	},
	{
		name: "Paper",
		beats: ["Rock", "Spock"],
		beatenBy: ["Scissors", "Lizard"]
	},
	{
		name: "Scissors",
		beats: ["Paper", "Lizard"],
		beatenBy: ["Rock", "Spock"]
	},
	{
		name: "Lizard",
		beats: ["Paper", "Spock"],
		beatenBy: ["Rock", "Scissors"]
	},
	{
		name: "Spock",
		beats: ["Rock", "Scissors"],
		beatenBy: ["Paper", "Lizard"]
	}];

function computerStroke(strokes = posStrokes) {
	let stroke = Math.floor(Math.random() * Math.floor(strokes.length));

	return strokes[stroke].name;
}

function getStrokesList(strokes = posStrokes) {
	let strockesList = "";

	for (let i = 0; i < strokes.length; ++i) {
		strockesList += `- ${ strokes[i].name }\n`;
	}
	return strockesList;
}

function checkPlayerSelection(playerSelection, strokes = posStrokes) {
	return strokes.map(stroke => stroke.name).indexOf(playerSelection) !== -1;
}

function capitalize(word) {
	return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

function playerStroke(strokes = posStrokes) {
	let stroke = prompt(`Select your stroke:\n${ getStrokesList() }`);
	stroke = capitalize(stroke);

	while (!checkPlayerSelection(stroke)) {
		stroke = prompt(`Wrong selection, please try again.\nSelect your stroke:\n${ getStrokesList() }`);
		stroke = capitalize(stroke);
	}
	return stroke;
}

function getElem(name, elem, list = posStrokes) {
	for (let i = 0; i < list.length; ++i) {
		if (list[i].name === name && list[i].hasOwnProperty(elem)) {
			return list[i][elem];
		}
	}
	return [];
}

function checkStrokes(player, computer) {
	let loosers = getElem(player, "beats");
	let winners = getElem(player, "beatenBy");
	if (loosers.indexOf(computer) !== -1) {
		return "Player";
	} else if (winners.indexOf(computer) !== -1) {
		return "Computer";
	} else {
		return "";
	}
}
function getResult(winner, player, computer) {
	switch (winner) {
		case "Player":
			return `You win! ${ player } beats ${ computer }!`;
			break;
		case "":
			return "It's a draw.";
			break;
		case "Computer":
			return `You loose! ${ computer } beats ${ player }!`;
			break;
	}
}

function getScores(scores) {
	let display = "";
	for (let player in scores) {
		display += `${ player }: ${ scores[player] }\n`
	}
	return display;
}

function playRound() {
	let computer = computerStroke();
	let player = playerStroke();
	let winner = checkStrokes(player, computer);
	alert(getResult(winner, player, computer));
	return winner;
}

function game() {
	let scores = {
		Player: 0,
		Computer: 0
	};

	while (scores.Player < 5 && scores.Computer < 5) {
		let winner = playRound();
		if (winner !== "") {
			scores[winner] += 1;
		}
		alert(getScores(scores));
	}
}
