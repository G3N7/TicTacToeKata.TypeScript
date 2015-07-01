class GameCtrlState {
	constructor() {
		this.currentGame = new Game();
		this.previousGames = [];
		this.currentGameResult = new GameResult(false, false, Marker.Empty);
        this.currentTurnResult = TurnResult.NotSet;
	}

	previousGames: Game[];
	currentGame: Game;
	currentTurnResult: TurnResult;
    currentGameResult: GameResult;

    get currentWinnerText(): string {
        return this.currentGameResult.whoWon == Marker.Empty
            ? "No Winner!"
            : "Winner " + Marker[this.currentGameResult.whoWon] + "!";
    }
}

interface IGameCtrlScope extends ng.IScope {
	gameState: GameCtrlState;
	takeTurn(x: number, y: number);
	resetGame: () => void
}

// ReSharper disable once InconsistentNaming
function GameCtrl($scope: IGameCtrlScope, turnService: ITurnService, gameResultService: IGameResultService) {
	$scope.gameState = new GameCtrlState();
	
	$scope.takeTurn = (x: number, y: number) => {
		$scope.gameState.currentTurnResult = turnService.tryTakeTurn($scope.gameState.currentGame, { x: x, y: y });
		console.log(TurnResult[$scope.gameState.currentTurnResult], $scope.gameState.currentGame);
		$scope.gameState.currentGameResult = gameResultService.checkResult($scope.gameState.currentGame);
		console.log($scope.gameState.currentGameResult, $scope.gameState.currentGame);
	};

	$scope.resetGame = () => {
		$scope.gameState.previousGames.push($scope.gameState.currentGame);
		$scope.gameState.currentGame = new Game();
		$scope.gameState.currentGameResult = new GameResult(false, false, Marker.Empty);
		$scope.gameState.currentTurnResult = TurnResult.Valid;
    };
}