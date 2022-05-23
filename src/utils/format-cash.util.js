export function formatCash(str) {
	// if not a number should be return null
	if (Number.isNaN(Number(str))) return null;

	/**
	 * split: transform to an array
	 * reverse: reverse array
	 * reduce: if index is third will return next value and prev value if is not third must return next and dot and pre value.
	 *  */
	return (
		String(str)
			.split('')
			.reverse()
			.reduce((prev, next, index) => {
				return (index % 3 ? next : next + '.') + prev;
			}) + ' đ'
	);
}
