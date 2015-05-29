class GameResultServiceTests {

	constructor(gameResultService: IGameResultService) {
		this.gameResultService = gameResultService;

		describe('GameResultService',() => {

			beforeEach(() => {
				this.game = new Game();
			});

			function winningBoards(markerToWin: Marker) {
				describe('Winning boards for ' + Marker[markerToWin],() => {

					function boardToWin(nameOfBoard: string, gameSetup: (game: Game) => void) {
						describe(nameOfBoard,() => {
							beforeEach(() => {
								gameSetup(this.game);
								this.gameResult = this.gameResultService.checkResult(this.game);
							});

							it('has winner',() => {
								expect(this.gameResult.hasWinner).toBe(true);
							});

							it('game is finished',() => {
								expect(this.gameResult.isStillGoing).toBe(false);
							});

							it('has no tie',() => {
								expect(this.gameResult.isTie).toBe(false);
							});

							it('marker that won to be ' + Marker[markerToWin],() => {
								expect(this.gameResult.whoWon).toBe(markerToWin);
							});
						});
					}

					boardToWin('across top row',(game: Game) => {
						game.board[0][0] = markerToWin;
						game.board[0][1] = markerToWin;
						game.board[0][2] = markerToWin;
					});

					boardToWin('across middle row',(game: Game) => {
						game.board[1][0] = markerToWin;
						game.board[1][1] = markerToWin;
						game.board[1][2] = markerToWin;
					});

					boardToWin('across bottom row',(game: Game) => {
						game.board[2][0] = markerToWin;
						game.board[2][1] = markerToWin;
						game.board[2][2] = markerToWin;
					});

					boardToWin('down left column',(game: Game) => {
						game.board[0][0] = markerToWin;
						game.board[0][1] = markerToWin;
						game.board[0][2] = markerToWin;
					});

					boardToWin('down middle column',(game: Game) => {
						game.board[1][0] = markerToWin;
						game.board[1][1] = markerToWin;
						game.board[1][2] = markerToWin;
					});

					boardToWin('down right column',(game: Game) => {
						game.board[2][0] = markerToWin;
						game.board[2][1] = markerToWin;
						game.board[2][2] = markerToWin;
					});

					boardToWin('diagonal left top to right bottom',(game: Game) => {
						game.board[0][0] = markerToWin;
						game.board[1][1] = markerToWin;
						game.board[2][2] = markerToWin;
					});

					boardToWin('diagonal left bottom to right top',(game: Game) => {
						game.board[2][0] = markerToWin;
						game.board[1][1] = markerToWin;
						game.board[0][2] = markerToWin;
					});
				});
			}

			winningBoards(Marker.X);
			winningBoards(Marker.O);

			describe('Cats game (tie)',() => {

				beforeEach(() => {
					this.game.board[0][0] = Marker.X;
					this.game.board[0][1] = Marker.X;
					this.game.board[0][2] = Marker.O;
					this.game.board[1][0] = Marker.O;
					this.game.board[1][1] = Marker.O;
					this.game.board[1][2] = Marker.X;
					this.game.board[2][0] = Marker.X;
					this.game.board[2][1] = Marker.O;
					this.game.board[2][2] = Marker.X;

					this.gameResult = this.gameResultService.checkResult(this.game);
				});

				it('ends in a tie',() => {
					expect(this.gameResult.isTie).toBe(true);
				});

				it('has no winner',() => {
					expect(this.gameResult.hasWinner).toBe(false);
				});

				it('game has finished',() => {
					expect(this.gameResult.isStillGoing).toBe(false);
				});
			});

			describe('normal play',() => {

				beforeEach(() => {
					this.game.board[0][0] = Marker.X;
					this.game.board[0][1] = Marker.X;
					this.game.board[0][2] = Marker.O;
					this.game.board[1][0] = Marker.O;
					this.game.board[1][1] = Marker.O;
					this.game.board[1][2] = Marker.X;

					this.gameResult = this.gameResultService.checkResult(this.game);
				});

				it('does not prematurly end in a tie', () => {
					expect(this.gameResult.isTie).toBe(false);
				});

				it('does not prematurly end in a win',() => {
					expect(this.gameResult.hasWinner).toBe(false);
					expect(this.gameResult.whoWon).toBe(Marker.Empty);
				});
			});

			afterEach(() => {
				GameResultServiceTests.displayGame(this.game);
				GameResultServiceTests.displayResult(this.gameResult);
				console.log('=======================================================================');
			});
		});
	}

	private static displayGame(game: Game): void {
		var stringVersions: string[][] = [[], [], []];

		function stringifyMarker(marker: Marker) {
			return marker != Marker.Empty ? Marker[marker] : '';
		}

		function assignCopyOut(x: number, y: number) {
			stringVersions[x][y] = stringifyMarker(game.board[x][y]);
		}

		assignCopyOut(0, 0);
		assignCopyOut(0, 1);
		assignCopyOut(0, 2);
		assignCopyOut(1, 0);
		assignCopyOut(1, 1);
		assignCopyOut(1, 2);
		assignCopyOut(2, 0);
		assignCopyOut(2, 1);
		assignCopyOut(2, 2);

		(<any>console).table(stringVersions);
	}

	private static displayResult(result: GameResult): void {
		console.log(result);
	}

	gameResultService: IGameResultService;
	gameResult: GameResult;
	game: Game;
}
