// Requirements:
//  * should check if the square is taken and return invalid if it is
//  * if the square is valid, claim it by changing that squares state on the board
//  * if the square is valid, increment the turn and change the whosTurnIsIt to reflect the success.

class SampleTurnService implements ITurnService{
	tryTakeTurn(game: Game, attempt: TurnAttempt): TurnResult {
		if (game.board[attempt.x][attempt.y] != Marker.Empty) return TurnResult.Invalid;
		game.board[attempt.x][attempt.y] = game.whosTurnIsIt;
		game.currentTurn++;
		if (game.whosTurnIsIt == Marker.X) {
			game.whosTurnIsIt = Marker.O;
		} else {
			game.whosTurnIsIt = Marker.X;
		}
		return TurnResult.Valid;
	}
}