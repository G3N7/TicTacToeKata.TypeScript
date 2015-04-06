interface IGameResultService {
	// Requirements:
	// * if three Marker.X or Marker.O appear in a line across, down or diagonally, return a GameResult indicating which marker has won.
	// * if there is no winner and no squares remain, return a GameResult indicating isTie.
	// * if there is no winner and there are still squares unclaimed, the game isStillGoing
	checkResult(game: Game): GameResult;
}