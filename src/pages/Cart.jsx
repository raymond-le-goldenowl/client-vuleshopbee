import {Button, Container, Grid, Paper} from '@mui/material';
import Header from 'components/Header';
import MappedCartItem from 'components/MappedCartItem';
import {
	checkout,
	removeCartItem,
	updateQuantityCartItem,
} from 'containers/Cart/cartSlice';
import {React, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

function Cart() {
	const dispatch = useDispatch();
	const {cart} = useSelector(state => state.cart);
	const [items, setItems] = useState([]);

	useEffect(() => {
		setItems(cart?.items);
		if (cart?.checkout?.url) {
			window.location.href = cart.checkout.url;
		}
	}, [cart]);

	const onIncrementQuantity = async (
		cartItemId = '',
		productId = '',
		defaultQuantity = 0,
		currentQuantity = 0,
	) => {
		dispatch(
			updateQuantityCartItem({
				quantity: defaultQuantity + 1,
				cartItemId,
				productId,
			}),
		);
		return null;
	};

	const onDescrementQuantity = async (
		cartItemId = '',
		productId = '',
		defaultQuantity = 0,
		currentQuantity = 0,
	) => {
		if (defaultQuantity - 1 === 0) return;
		dispatch(
			updateQuantityCartItem({
				quantity: defaultQuantity - 1,
				cartItemId,
				productId,
			}),
		);
		return null;
	};

	const onChangeInputQuantity = async (
		cartItemId = '',
		productId = '',
		defaultQuantity = 0,
		event = {},
	) => {
		const number = Number(event.key);

		if (!Number.isNaN(number)) {
			const data = defaultQuantity + '' + event.key;
			dispatch(
				updateQuantityCartItem({
					quantity: Number(data),
					cartItemId,
					productId,
				}),
			);
		}

		if (event.key === 'Backspace') {
			const data = String(defaultQuantity).slice(0, -1);
			if (!data) return;
			dispatch(
				updateQuantityCartItem({
					quantity: Number(data),
					cartItemId,
					productId,
				}),
			);
		}

		return null;
	};

	const onDeleteCartItem = async (cartItemId, productId) => {
		dispatch(removeCartItem({cartItemId, productId}));
	};

	const onCheckout = async () => {
		dispatch(checkout());
	};

	return (
		<div className='app-vuleshopbee'>
			<Header />
			<Container maxWidth='lg' style={{backgroundColor: '#E7EBF0'}}>
				<Grid container columnSpacing={3}>
					<Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
						<MappedCartItem
							onChangeInputQuantity={onChangeInputQuantity}
							onDescrementQuantity={onDescrementQuantity}
							onIncrementQuantity={onIncrementQuantity}
							onDeleteCartItem={onDeleteCartItem}
							items={items}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
						<Paper evolution={2} style={{margin: '10px 0', padding: 10}}>
							<Button variant='contained' color='info' onClick={onCheckout}>
								Checkout
							</Button>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}

export default Cart;
