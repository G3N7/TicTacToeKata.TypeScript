function MarkerFilter() {
	return (input: number) => {
		return input == Marker.Empty ? '' : Marker[input];
	};
}