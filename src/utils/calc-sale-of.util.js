export function calcSaleOf(price, originalPrice) {
	return Math.round(100 - (price * 100) / originalPrice);
}
