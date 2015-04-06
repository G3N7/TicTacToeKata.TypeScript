var Game = (function () {
    function Game() {
        this.board = [
            [0 /* Empty */, 0 /* Empty */, 0 /* Empty */],
            [0 /* Empty */, 0 /* Empty */, 0 /* Empty */],
            [0 /* Empty */, 0 /* Empty */, 0 /* Empty */]
        ];
        this.currentTurn = 1;
        this.whoGoesFirst = Date.now() % 2 == 0 ? 1 /* X */ : 2 /* O */;
        this.whosTurnIsIt = this.whoGoesFirst;
    }
    return Game;
})();
//# sourceMappingURL=GameBoard.js.map