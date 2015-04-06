class GameResult {
	constructor(isTie: boolean, hasWinner: boolean, whoWon: Marker) {
		this.isTie = isTie;
		this.hasWinner = hasWinner;
		this.whoWon = whoWon;
		this.isStillGoing = !hasWinner && !isTie;
	}

	isTie: boolean;
	hasWinner: boolean;
	whoWon: Marker;
	isStillGoing: boolean;
}