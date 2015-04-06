class SampleGameResultService implements IGameResultService {
	checkResult(game: Game): GameResult {
		var hasWinner = false;
		var winner = Marker.Empty;
		var isTie = false;

		if (this.checkForColumnWinner(game.board, Marker.X) || this.checkForRowWinner(game.board, Marker.X) || this.checkForDiaginalWinner(game.board, Marker.X)) {
			hasWinner = true;
			winner = Marker.X;
		}

		if (this.checkForColumnWinner(game.board, Marker.O) || this.checkForRowWinner(game.board, Marker.O) || this.checkForDiaginalWinner(game.board, Marker.O)) {
			hasWinner = true;
			winner = Marker.O;
		}

		if (!hasWinner && !this.hasEmptySpace(game.board)) {
			isTie = true;
		}

		return new GameResult(isTie, hasWinner, winner);
	}

	private hasEmptySpace(board: Marker[][]) {
		for (var row = 0; row < 3; row++) {
			for (var col = 0; col < 3; col++) {
				if (board[col][row] == Marker.Empty) return true;
			}
		}
		return false;
	}

	private checkForColumnWinner(board: Marker[][], markerToCheckFor: Marker): boolean {
		for (var col = 0; col < 3; col++) {
			var matchs = 0;
			for (var row = 0; row < 3; row++) {
				if (markerToCheckFor == board[col][row]) matchs++;
				if (matchs == 3) return true;
			}
		}
		return false;
	}

	private checkForRowWinner(board: Marker[][], markerToCheckFor: Marker): boolean {
		for (var row = 0; row < 3; row++) {
			var matchs = 0;
			for (var col = 0; col < 3; col++) {
				if (markerToCheckFor == board[col][row]) matchs++;
				if (matchs == 3) return true;
			}
		}
		return false;
	}

	private checkForDiaginalWinner(board: Marker[][], markerToCheckFor: Marker): boolean {
		if (board[0][0] == markerToCheckFor && board[1][1] == markerToCheckFor && board[2][2] == markerToCheckFor) return true;
		if (board[0][2] == markerToCheckFor && board[1][1] == markerToCheckFor && board[2][0] == markerToCheckFor) return true;
		return false;
	}
} 