function TurnResultFilter() {
	return (input: number) => {
		return input == TurnResult.NotSet ? '' : TurnResult[input];
	};
} 