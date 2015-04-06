var SampleGameResultService = (function () {
    function SampleGameResultService() {
    }
    SampleGameResultService.prototype.checkResult = function (game) {
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
    };
    SampleGameResultService.prototype.hasEmptySpace = function (board) {
        for (var row = 0; row < 3; row++) {
            for (var col = 0; col < 3; col++) {
                if (board[col][row] == Marker.Empty)
                    return true;
            }
        }
        return false;
    };
    SampleGameResultService.prototype.checkForColumnWinner = function (board, markerToCheckFor) {
        for (var col = 0; col < 3; col++) {
            var matchs = 0;
            for (var row = 0; row < 3; row++) {
                if (markerToCheckFor == board[col][row])
                    matchs++;
                if (matchs == 3)
                    return true;
            }
        }
        return false;
    };
    SampleGameResultService.prototype.checkForRowWinner = function (board, markerToCheckFor) {
        for (var row = 0; row < 3; row++) {
            var matchs = 0;
            for (var col = 0; col < 3; col++) {
                if (markerToCheckFor == board[col][row])
                    matchs++;
                if (matchs == 3)
                    return true;
            }
        }
        return false;
    };
    SampleGameResultService.prototype.checkForDiaginalWinner = function (board, markerToCheckFor) {
        if (board[0][0] == markerToCheckFor && board[1][1] == markerToCheckFor && board[2][2] == markerToCheckFor)
            return true;
        if (board[0][2] == markerToCheckFor && board[1][1] == markerToCheckFor && board[2][0] == markerToCheckFor)
            return true;
        return false;
    };
    return SampleGameResultService;
})();
//# sourceMappingURL=SampleGameResultService.js.map