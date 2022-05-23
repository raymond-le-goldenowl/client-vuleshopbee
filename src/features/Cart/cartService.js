import axiosInstance from 'api/axios-instance';

const CART_URL = '/carts';

// Get cart
const getCart = async () => {
	const data = await axiosInstance.get(`${CART_URL}/one`);

	return data;
};

const updateQuantityCartItem = async (
	quantity,
	cartId,
	cartItemId,
	productId,
) => {
	const data = await axiosInstance.patch(`cart-item/${cartItemId}`, {
		quantity,
		cartId,
		productId,
	});

	return data;
};

const loadMoreCarts = async (page, perPage, value = '') => {
	const data = await axiosInstance.get(
		`${CART_URL}/filters/?page=${page}&per_page=${perPage}&search=${value}`,
	);
	return data;
};

const removeCartItem = async (id, remove = true, cartId, productId) => {
	const data = await axiosInstance.delete(
		`cart-item/${id}?remove=${remove}&cartId=${cartId}&productId=${productId}`,
	);
	return data;
};

const reset = async () => {
	const data = await axiosInstance.delete(`cart-item/remove`);

	return data;
};
const cartService = {
	getCart,
	loadMoreCarts,
	updateQuantityCartItem,
	removeCartItem,
	reset,
};

export default cartService;
