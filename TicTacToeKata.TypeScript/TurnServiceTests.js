var TurnServiceTests = (function () {
    function TurnServiceTests(turnService) {
        describe('TurnService', function () {
            var game;
            var turnResult;
            beforeEach(function () {
                game = new Game();
                turnResult = TurnResult.NotSet;
            });
            function validMove(scenarioName, gameSetup, attempt) {
                describe(scenarioName, function () {
                    var turnNumberAtStart;
                    var whosTurnIsItAtStart;
                    beforeEach(function () {
                        gameSetup(game);
                        turnNumberAtStart = game.currentTurn;
                        whosTurnIsItAtStart = game.whosTurnIsIt;
                        turnResult = turnService.tryTakeTurn(game, attempt);
                    });
                    it('is a valid move', function () {
                        expect(turnResult).toBe(TurnResult.Valid);
                    });
                    it('increases the turn', function () {
                        expect(game.currentTurn).toBe(turnNumberAtStart + 1);
                    });
                    it('adds the marker to the board at the correct square', function () {
                        expect(game.board[attempt.x][attempt.y]).toBe(whosTurnIsItAtStart);
                    });
                    it('changes the turn', function () {
                        expect(game.whosTurnIsIt).not.toBe(whosTurnIsItAtStart);
                        expect(game.whosTurnIsIt).not.toBe(Marker.Empty);
                    });
                });
            }
            function invalidMove(scenarioName, gameSetup, attempt) {
                describe(scenarioName, function () {
                    var turnNumberAtStart;
                    var whosTurnIsItAtStart;
                    beforeEach(function () {
                        gameSetup(game);
                        turnNumberAtStart = game.currentTurn;
                        whosTurnIsItAtStart = game.whosTurnIsIt;
                        turnResult = turnService.tryTakeTurn(game, attempt);
                    });
                    it('does not change the turn', function () {
                        expect(game.currentTurn).toBe(turnNumberAtStart);
                    });
                    it('is not a valid move', function () {
                        expect(turnResult).toBe(TurnResult.Invalid);
                    });
                    it('done not change whom\'s turn it is', function () {
                        expect(game.whosTurnIsIt).toBe(whosTurnIsItAtStart);
                    });
                });
            }
            validMove('first move', function (g) {
            }, new TurnAttempt(0, 0));
            validMove('second turn picking empty space', function (g) {
                g.board[0][0] = Marker.X;
                g.currentTurn = 2;
                g.whoGoesFirst = Marker.X;
                g.whosTurnIsIt = Marker.O;
            }, new TurnAttempt(0, 1));
            validMove('winning move', function (g) {
                g.board[0][0] = Marker.X;
                g.board[0][1] = Marker.O;
                g.board[1][1] = Marker.X;
                g.board[0][2] = Marker.O;
                g.whoGoesFirst = Marker.X;
                g.currentTurn = 5;
                g.whosTurnIsIt = Marker.X;
            }, new TurnAttempt(2, 2));
            invalidMove('second turn space taken', function (g) {
                g.board[2][2] = Marker.X;
                g.whoGoesFirst = Marker.X;
                g.currentTurn = 2;
                g.whosTurnIsIt = Marker.O;
            }, new TurnAttempt(2, 2));
            invalidMove('thrid turn space taken', function (g) {
                g.board[2][2] = Marker.X;
                g.board[0][0] = Marker.O;
                g.whoGoesFirst = Marker.X;
                g.currentTurn = 3;
                g.whosTurnIsIt = Marker.X;
            }, new TurnAttempt(0, 0));
        });
    }
    return TurnServiceTests;
})();
//# sourceMappingURL=TurnServiceTests.js.map