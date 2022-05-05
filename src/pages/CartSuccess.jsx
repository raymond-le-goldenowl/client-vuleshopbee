import axiosInstance from 'config/axios-instance';
import {resetCart} from 'containers/Cart/cartSlice';
import {createOrder} from 'containers/Order/orderSlice';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

function CartSuccess() {
	const dispatch = useDispatch();
	const {user} = useSelector(state => state.auth);
	const {cart} = useSelector(state => state.cart);

	useEffect(() => {
		const clientSecret = sessionStorage.getItem('cs');
		axiosInstance(user?.accessToken)
			.post(`stripe/retrieve-payment-intent/${clientSecret}`)
			.then(res => {
				if (res.data?.payment_status === 'paid') {
					console.log(res.data);
					// move all data from cart item to order item.
					dispatch(
						createOrder({
							description: '',
							receiver: res.data?.customer_details?.email,
						}),
					);
					// remove cart
					dispatch(resetCart());
					// redirect to 'cart page'.
					if (cart.items.length === 0) {
						window.location.href = '/';
					}
				}
			});
	}, []);
	return <h1 align='center'>Loading...</h1>;
}

CartSuccess.propTypes = {};

export default CartSuccess;
