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

const updateQuantityOrderItem = async (
	quantity,
	orderId,
	orderItemId,
	productId,
) => {
	const data = await axiosInstance.patch(`/orders/quantity/${orderId}`, {
		quantity,
		orderId,
		productId,
		orderItemId,
	});

	return data;
};

const updateOrder = async orderId => {
	const data = await axiosInstance.patch(`${ORDER_URL}/${orderId}`, {
		status: true,
	});

	return data;
};
export const cancelOrder = async orderId => {
	const data = await axiosInstance.delete(`${ORDER_URL}/${orderId}`);

	return data;
};

// Get orders
const getOrders = async () => {
	const data = await axiosInstance.get(ORDER_URL);
	return data;
};

// Get orders
const getOneOrder = async id => {
	const data = await axiosInstance.get(`${ORDER_URL}/${id}/?with_deleted=true`);
	return data;
};

const orderService = {
	getOrders,
	createOrder,
	getOneOrder,
	updateOrder,
	cancelOrder,
	updateQuantityOrderItem,
};

export default orderService;
