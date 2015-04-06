var GameResult = (function () {
    function GameResult(isTie, hasWinner, whoWon) {
        this.isTie = isTie;
        this.hasWinner = hasWinner;
        this.whoWon = whoWon;
        this.isStillGoing = !hasWinner && !isTie;
    }
    return GameResult;
})();
//# sourceMappingURL=GameResult.js.map