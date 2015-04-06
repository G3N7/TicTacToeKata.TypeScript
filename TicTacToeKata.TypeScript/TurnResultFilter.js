function TurnResultFilter() {
    return function (input) {
        return input == TurnResult.NotSet ? '' : TurnResult[input];
    };
}
//# sourceMappingURL=TurnResultFilter.js.map