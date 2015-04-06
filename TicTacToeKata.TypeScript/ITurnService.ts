interface ITurnService {
	// Requirements:
	//  * should check if the square is taken and return invalid if it is
	//  * if the square is valid, claim it by changing that squares state on the board
	//  * if the square is valid, increment the turn and change the whosTurnIsIt to reflect the success.
	tryTakeTurn(game: Game, attempt: TurnAttempt): TurnResult;
}