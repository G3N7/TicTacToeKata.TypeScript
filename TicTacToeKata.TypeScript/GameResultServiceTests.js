var GameResultServiceTests = (function () {
    function GameResultServiceTests(gameResultService) {
        var _this = this;
        this.gameResultService = gameResultService;
        describe('GameResultService', function () {
            beforeEach(function () {
                _this.game = new Game();
            });
            function winningBoards(markerToWin) {
                describe('Winning boards for ' + Marker[markerToWin], function () {
                    function boardToWin(nameOfBoard, gameSetup) {
                        var _this = this;
                        describe(nameOfBoard, function () {
                            beforeEach(function () {
                                gameSetup(_this.game);
                                _this.gameResult = _this.gameResultService.checkResult(_this.game);
                            });
                            it('has winner', function () {
                                expect(_this.gameResult.hasWinner).toBe(true);
                            });
                            it('game is finished', function () {
                                expect(_this.gameResult.isStillGoing).toBe(false);
                            });
                            it('has no tie', function () {
                                expect(_this.gameResult.isTie).toBe(false);
                            });
                            it('marker that won to be ' + Marker[markerToWin], function () {
                                expect(_this.gameResult.whoWon).toBe(markerToWin);
                            });
                        });
                    }
                    boardToWin('across top row', function (game) {
                        game.board[0][0] = markerToWin;
                        game.board[1][0] = markerToWin;
                        game.board[2][0] = markerToWin;
                    });
                    boardToWin('across middle row', function (game) {
                        game.board[0][1] = markerToWin;
                        game.board[1][1] = markerToWin;
                        game.board[2][1] = markerToWin;
                    });
                    boardToWin('across bottom row', function (game) {
                        game.board[0][2] = markerToWin;
                        game.board[1][2] = markerToWin;
                        game.board[2][2] = markerToWin;
                    });
                    boardToWin('down left column', function (game) {
                        game.board[0][0] = markerToWin;
                        game.board[0][1] = markerToWin;
                        game.board[0][2] = markerToWin;
                    });
                    boardToWin('down middle column', function (game) {
                        game.board[1][0] = markerToWin;
                        game.board[1][1] = markerToWin;
                        game.board[1][2] = markerToWin;
                    });
                    boardToWin('down right column', function (game) {
                        game.board[2][0] = markerToWin;
                        game.board[2][1] = markerToWin;
                        game.board[2][2] = markerToWin;
                    });
                    boardToWin('diagonal left top to right bottom', function (game) {
                        game.board[0][0] = markerToWin;
                        game.board[1][1] = markerToWin;
                        game.board[2][2] = markerToWin;
                    });
                    boardToWin('diagonal left bottom to right top', function (game) {
                        game.board[0][2] = markerToWin;
                        game.board[1][1] = markerToWin;
                        game.board[2][0] = markerToWin;
                    });
                });
            }
            winningBoards(Marker.X);
            winningBoards(Marker.O);
            describe('Cats game (tie)', function () {
                beforeEach(function () {
                    _this.game.board[0][0] = Marker.X;
                    _this.game.board[0][1] = Marker.X;
                    _this.game.board[0][2] = Marker.O;
                    _this.game.board[1][0] = Marker.O;
                    _this.game.board[1][1] = Marker.O;
                    _this.game.board[1][2] = Marker.X;
                    _this.game.board[2][0] = Marker.X;
                    _this.game.board[2][1] = Marker.O;
                    _this.game.board[2][2] = Marker.X;
                    _this.gameResult = _this.gameResultService.checkResult(_this.game);
                });
                it('ends in a tie', function () {
                    expect(_this.gameResult.isTie).toBe(true);
                });
                it('has no winner', function () {
                    expect(_this.gameResult.hasWinner).toBe(false);
                });
                it('game has finished', function () {
                    expect(_this.gameResult.isStillGoing).toBe(false);
                });
            });
            describe('normal play', function () {
                beforeEach(function () {
                    _this.game.board[0][0] = Marker.X;
                    _this.game.board[0][1] = Marker.X;
                    _this.game.board[0][2] = Marker.O;
                    _this.game.board[1][0] = Marker.O;
                    _this.game.board[1][1] = Marker.O;
                    _this.game.board[1][2] = Marker.X;
                    _this.gameResult = _this.gameResultService.checkResult(_this.game);
                });
                it('does not prematurly end in a tie', function () {
                    expect(_this.gameResult.isTie).toBe(false);
                });
                it('does not prematurly end in a win', function () {
                    expect(_this.gameResult.hasWinner).toBe(false);
                    expect(_this.gameResult.whoWon).toBe(Marker.Empty);
                });
            });
            afterEach(function () {
                GameResultServiceTests.displayGame(_this.game);
                GameResultServiceTests.displayResult(_this.gameResult);
                console.log('=======================================================================');
            });
        });
    }
    GameResultServiceTests.displayGame = function (game) {
        var stringVersions = [[], [], []];
        function stringifyMarker(marker) {
            return marker != Marker.Empty ? Marker[marker] : '';
        }
        function assignCopyOut(x, y) {
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
        console.table(stringVersions);
    };
    GameResultServiceTests.displayResult = function (result) {
        console.log(result);
    };
    return GameResultServiceTests;
})();
//# sourceMappingURL=GameResultServiceTests.js.map