class TurnServiceTests {

	constructor(turnService: ITurnService) {

		describe('TurnService',() => {

			var game: Game;
			var turnResult: TurnResult;
			beforeEach(() => {
				game = new Game();
				turnResult = TurnResult.NotSet;
			});

			function validMove(scenarioName: string, gameSetup: (g: Game) => void, attempt: TurnAttempt): void {
				describe(scenarioName,() => {

					var turnNumberAtStart: number;
					var whosTurnIsItAtStart: Marker;
					beforeEach(() => {
						gameSetup(game);
						turnNumberAtStart = game.currentTurn;
						whosTurnIsItAtStart = game.whosTurnIsIt;
						turnResult = turnService.tryTakeTurn(game, attempt);
					});

					it('is a valid move',() => {
						expect(turnResult).toBe(TurnResult.Valid);
					});

					it('increases the turn',() => {
						expect(game.currentTurn).toBe(turnNumberAtStart + 1);
					});

					it('adds the marker to the board at the correct square',() => {
						expect(game.board[attempt.x][attempt.y]).toBe(whosTurnIsItAtStart);
					});

					it('changes the turn',() => {
						expect(game.whosTurnIsIt).not.toBe(whosTurnIsItAtStart);
						expect(game.whosTurnIsIt).not.toBe(Marker.Empty);
					});
				});
			}

			function invalidMove(scenarioName: string, gameSetup: (g: Game) => void, attempt: TurnAttempt) {
				describe(scenarioName,() => {

					var turnNumberAtStart: number;
					var whosTurnIsItAtStart: Marker;
					beforeEach(() => {
						gameSetup(game);
						turnNumberAtStart = game.currentTurn;
						whosTurnIsItAtStart = game.whosTurnIsIt;
						turnResult = turnService.tryTakeTurn(game, attempt);
					});

					it('does not change the turn',() => {
						expect(game.currentTurn).toBe(turnNumberAtStart);
					});

					it('is not a valid move',() => {
						expect(turnResult).toBe(TurnResult.Invalid);
					});

					it('done not change whom\'s turn it is', () => {
						expect(game.whosTurnIsIt).toBe(whosTurnIsItAtStart);
					});
				});
			}

			validMove('first move',(g: Game) => { }, new TurnAttempt(0, 0));
			validMove('second turn picking empty space',(g: Game) => {
				g.board[0][0] = Marker.X;
				g.currentTurn = 2;
				g.whoGoesFirst = Marker.X;
				g.whosTurnIsIt = Marker.O;
			}, new TurnAttempt(0, 1));
			validMove('winning move',(g: Game) => {

				g.board[0][0] = Marker.X;
				g.board[0][1] = Marker.O;
				g.board[1][1] = Marker.X;
				g.board[0][2] = Marker.O;

				g.whoGoesFirst = Marker.X;
				g.currentTurn = 5;
				g.whosTurnIsIt = Marker.X;
			}, new TurnAttempt(2, 2));

			invalidMove('second turn space taken',(g: Game) => {
				g.board[2][2] = Marker.X;

				g.whoGoesFirst = Marker.X;
				g.currentTurn = 2;
				g.whosTurnIsIt = Marker.O;
			}, new TurnAttempt(2, 2));

			invalidMove('thrid turn space taken',(g: Game) => {
				g.board[2][2] = Marker.X;
				g.board[0][0] = Marker.O;

				g.whoGoesFirst = Marker.X;
				g.currentTurn = 3;
				g.whosTurnIsIt = Marker.X;
			}, new TurnAttempt(0, 0));
		});
	}
}
