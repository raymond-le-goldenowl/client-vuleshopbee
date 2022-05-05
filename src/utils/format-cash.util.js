export function formatCash(str) {
	if (Number.isNaN(Number(str))) return null;
	return (
		String(str)
			.split('')
			.reverse()
			.reduce((prev, next, index) => {
				return (index % 3 ? next : next + '.') + prev;
			}) + ' đ'
	);
}
