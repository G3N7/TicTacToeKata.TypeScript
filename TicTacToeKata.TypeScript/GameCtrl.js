var GameCtrlState = (function () {
    function GameCtrlState() {
        this.currentGame = new Game();
        this.previousGames = [];
        this.currentGameResult = new GameResult(false, false, Marker.Empty);
        this.currentTurnResult = TurnResult.NotSet;
    }
    Object.defineProperty(GameCtrlState.prototype, "currentWinnerText", {
        get: function () {
            return this.currentGameResult.whoWon == Marker.Empty ? "No Winner!" : "Winner " + Marker[this.currentGameResult.whoWon] + "!";
        },
        enumerable: true,
        configurable: true
    });
    return GameCtrlState;
})();
// ReSharper disable once InconsistentNaming
function GameCtrl($scope, turnService, gameResultService) {
    $scope.gameState = new GameCtrlState();
    $scope.takeTurn = function (x, y) {
        $scope.gameState.currentTurnResult = turnService.tryTakeTurn($scope.gameState.currentGame, { x: x, y: y });
        console.log(TurnResult[$scope.gameState.currentTurnResult], $scope.gameState.currentGame);
        $scope.gameState.currentGameResult = gameResultService.checkResult($scope.gameState.currentGame);
        console.log($scope.gameState.currentGameResult, $scope.gameState.currentGame);
    };
    $scope.resetGame = function () {
        $scope.gameState.previousGames.push($scope.gameState.currentGame);
        $scope.gameState.currentGame = new Game();
        $scope.gameState.currentGameResult = new GameResult(false, false, Marker.Empty);
        $scope.gameState.currentTurnResult = TurnResult.Valid;
    };
}
//# sourceMappingURL=GameCtrl.js.map