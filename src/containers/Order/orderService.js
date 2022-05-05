import axiosInstance from 'config/axios-instance';

const ORDER_URL = '/orders';
// const FILTER_PRODUCT_WITH_OPTIONS_URL = FILTER_PRODUCT_URL + `?page=${}&per_page=${}&category_id=${}&tag=${}&price_from=${}&price_to=${}&sort=${}&search=${}`;

// Create order
const createOrder = async (accessToken, description, receiver) => {
	const response = await axiosInstance(accessToken).post(ORDER_URL, {
		description,
		receiver,
	});

	return response.data;
};
// Get orders
const getOrders = async accessToken => {
	const response = await axiosInstance(accessToken).get(ORDER_URL);
	return response.data;
};

// Get orders
const getOneOrder = async (accessToken, id) => {
	const response = await axiosInstance(accessToken).get(
		ORDER_URL + '/' + id + '?with_deleted=true',
	);
	return response.data;
};

const orderService = {
	getOrders,
	createOrder,
	getOneOrder,
};

export default orderService;
