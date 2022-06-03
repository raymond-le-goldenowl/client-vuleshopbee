import axiosInstance from 'api/axios-instance';
import {LOCAL_CART_ITEMS} from './constants';

const CART_URL = '/carts';

// Get cart
const getCart = async () => {
	const data = await axiosInstance.get(`${CART_URL}/one`);

	return data;
};

const saveMergedArray = async mergedArray => {
	const data = await axiosInstance.post(`cart-item/save-items-combined`, {
		mergedArray,
	});

	console.log(data);
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

export const getCartLocal = () => {
	return localStorage.getItem(LOCAL_CART_ITEMS) !== null &&
		typeof JSON.parse(localStorage.getItem(LOCAL_CART_ITEMS)) === 'object'
		? JSON.parse(localStorage.getItem(LOCAL_CART_ITEMS))
		: [];
};

export const saveItemsToLocalStorage = ({quantity = 0, productId = ''}) => {
	const localCartItems = getCartLocal();
	const foundCartItem = localCartItems.find(
		item => item.productId === productId,
	);

	let data = [];

	if (!foundCartItem) {
		localCartItems.push({quantity, productId});
		data = localCartItems;
	} else {
		data = localCartItems.map(item => {
			if (item.productId === productId) {
				return {quantity: quantity + item?.quantity || 0, productId};
			}
			return item;
		});
	}

	const arrayJsonStringify = JSON.stringify(data);
	localStorage.setItem(LOCAL_CART_ITEMS, arrayJsonStringify);

	return data;
};

export const updateItemLocalStorage = ({quantity = 0, productId = ''}) => {
	const localCartItems = getCartLocal();
	const data = localCartItems.map(item => {
		if (item.productId === productId) {
			return {quantity: quantity || 0, productId};
		}
		return item;
	});

	const arrayJsonStringify = JSON.stringify(data);
	localStorage.setItem(LOCAL_CART_ITEMS, arrayJsonStringify);

	return data;
};

export const removeItemLocalStorage = productId => {
	const localCartItems = getCartLocal();
	const data = localCartItems.filter(item => item.productId !== productId);

	const arrayJsonStringify = JSON.stringify(data);
	localStorage.setItem(LOCAL_CART_ITEMS, arrayJsonStringify);

	return data;
};

const cartService = {
	getCart,
	loadMoreCarts,
	updateQuantityCartItem,
	removeCartItem,
	reset,
	saveItemsToLocalStorage,
	getCartLocal,
	updateItemLocalStorage,
	removeItemLocalStorage,
	saveMergedArray,
};

export default cartService;
