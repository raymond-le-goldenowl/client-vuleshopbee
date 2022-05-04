import React, {useEffect} from 'react';
import axiosInstance from 'config/axios-instance';
import {useDispatch, useSelector} from 'react-redux';
import {resetCart} from 'containers/Cart/cartSlice';
import {useNavigate} from 'react-router-dom';
function CartSuccess() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {user} = useSelector(state => state.auth);
	const {cart} = useSelector(state => state.cart);

	useEffect(() => {
		const clientSecret = sessionStorage.getItem('cs');
		axiosInstance(user?.accessToken)
			.post(`stripe/retrieve-payment-intent/${clientSecret}`)
			.then(res => {
				if (res.data?.payment_status === 'paid') {
					// remove cart
					dispatch(resetCart());
					// redirect to 'cart page'.
				}
			});
	}, []);

	useEffect(() => {
		if (cart.items.length === 0) {
			navigate('/');
		}
	}, [cart]);
	return <h1 align='center'>Loading...</h1>;
}

CartSuccess.propTypes = {};

export default CartSuccess;
