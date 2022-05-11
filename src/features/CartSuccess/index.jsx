import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {resetCart} from 'features/Cart/cartSlice';
import {createOrder} from 'features/Order/orderSlice';

import axiosInstance from 'api/axios-instance';

function CartSuccess() {
	const dispatch = useDispatch();
	const {cart} = useSelector(state => state.cart);
	const {orderDetail} = useSelector(state => state.order);

	useEffect(() => {
		// get clientSecret to retrieve payment intent
		const clientSecret = sessionStorage.getItem('cs');
		async function stipeAndCreateOrder() {
			try {
				// retrieve payment intent
				const data = await axiosInstance.post(
					`stripe/retrieve-payment-intent/${clientSecret}`,
				);

				// if paid, should be create an order
				if (data?.payment_status === 'paid') {
					// move all data from cart item to order item.
					dispatch(
						createOrder({
							description: '',
							receiver: data?.customer_details?.email,
						}),
					);
				}
			} catch (error) {
				window.location.href = `/account/cart`;
			}
		}

		// run
		stipeAndCreateOrder();
	}, []);

	useEffect(() => {
		// get orderId from orderDetail of store
		const orderId = orderDetail?.id || null;
		// redirect to 'cart page'.
		if (orderId && cart.items.length === 0) {
			// remove cart
			dispatch(resetCart());
			window.location.href = `/account/order/${orderId}`;
		}
	}, [orderDetail]);

	return <h1 align='center'>Loading...</h1>;
}

CartSuccess.propTypes = {};

export default CartSuccess;
