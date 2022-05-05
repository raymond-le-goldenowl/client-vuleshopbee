import axiosInstance from 'config/axios-instance';

const CART_URL = '/carts';
const FILTER_CART_URL = CART_URL + '/filters';
// const FILTER_PRODUCT_WITH_OPTIONS_URL = FILTER_PRODUCT_URL + `?page=${}&per_page=${}&category_id=${}&tag=${}&price_from=${}&price_to=${}&sort=${}&search=${}`;

// Get user products
const getCart = async accessToken => {
	const response = await axiosInstance(accessToken).get(CART_URL + '/one');

	return response.data;
};

const updateQuantityCartItem = async (
	quantity,
	cartId,
	cartItemId,
	productId,
	accessToken,
) => {
	const response = await axiosInstance(accessToken).patch(
		`/cart-item/${cartItemId}`,
		{
			quantity,
			cartId,
			productId,
		},
	);

	return response.data;
};

const loadMoreCarts = async (page, perPage, value = '') => {
	const response = await axiosInstance().get(
		FILTER_CART_URL + `?page=${page}&per_page=${perPage}&search=${value}`,
	);
	return response.data;
};

const removeCartItem = async (
	id,
	remove = true,
	cartId,
	productId,
	accessToken,
) => {
	const response = await axiosInstance(accessToken).delete(
		`/cart-item/${id}?remove=${remove}&cartId=${cartId}&productId=${productId}`,
	);
	return response.data;
};

const checkout = async accessToken => {
	const response = await axiosInstance(accessToken).post(
		'/stripe/create-payment-intent',
	);

	return response.data?.checkoutSessions;
};

const reset = async accessToken => {
	const response = await axiosInstance(accessToken).delete('/cart-item/remove');

	return response.data;
};
const cartService = {
	getCart,
	loadMoreCarts,
	updateQuantityCartItem,
	removeCartItem,
	checkout,
	reset,
};

export default cartService;
