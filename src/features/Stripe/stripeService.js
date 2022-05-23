import axiosInstance from 'api/axios-instance';

const checkout = async orderId => {
	const data = await axiosInstance.post(
		'/stripe/create-payment-intent/' + orderId,
	);

	return data;
};

const stripeService = {
	checkout,
};

export default stripeService;
