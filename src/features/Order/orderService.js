import axiosInstance from 'api/axios-instance';

const ORDER_URL = '/orders';

// Create order
const createOrder = async (description, receiver) => {
	const data = await axiosInstance.post(ORDER_URL, {
		description,
		receiver,
	});

	return data;
};
// Get orders
const getOrders = async () => {
	const data = await axiosInstance.get(ORDER_URL);
	return data;
};

// Get orders
const getOneOrder = async id => {
	const data = await axiosInstance.get(
		ORDER_URL + '/' + id + '?with_deleted=true',
	);
	return data;
};

const orderService = {
	getOrders,
	createOrder,
	getOneOrder,
};

export default orderService;