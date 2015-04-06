class Game {
	constructor() {
		this.board = [
			[Marker.Empty, Marker.Empty, Marker.Empty],
			[Marker.Empty, Marker.Empty, Marker.Empty],
			[Marker.Empty, Marker.Empty, Marker.Empty]
		];
		this.currentTurn = 1;
		this.whoGoesFirst = Date.now() % 2 == 0 ? Marker.X : Marker.O;
		this.whosTurnIsIt = this.whoGoesFirst;
	}
	board: Marker[][];
	currentTurn: number;
	whoGoesFirst: Marker;
	whosTurnIsIt: Marker;
}