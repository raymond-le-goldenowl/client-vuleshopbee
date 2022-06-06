import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {resetCart} from 'features/Cart/cartSlice';
import {useNavigate} from 'react-router-dom';
import axiosInstance from 'api/axios-instance';

export function StripeSuccessPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const clientSecret = sessionStorage.getItem('cs');
	const orderId = sessionStorage.getItem('orderId');
	useEffect(() => {
		// get clientSecret to retrieve payment intent

		async function stipeAndCreateOrder() {
			try {
				// retrieve payment intent
				const data = await axiosInstance.post(
					`/stripe/retrieve-payment-intent/${clientSecret}?orderId=${orderId}`,
				);
				// if paid, should be create an order
				if (data?.payment_status === 'paid') {
					// update order
					dispatch(resetCart());
					navigate(`/account/order/${orderId}`);
					// window.location.href = `/account/order/${orderId}`;
				}
			} catch (error) {
				navigate(`/account/cart`);
				// window.location.href = `/account/cart`;
			}
		}

		// run
		stipeAndCreateOrder();
	}, []);
	return <h1 align='center'>Loading...</h1>;
}
