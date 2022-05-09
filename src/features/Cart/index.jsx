import {React, useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import styled from '@emotion/styled';
import {useDispatch, useSelector} from 'react-redux';
import {Box, Button, Container, Grid, Paper, Typography} from '@mui/material';

import DisplayImage from 'components/DisplayImage';
import MappedCartItem from 'features/Cart/components/MappedCartItem';

import {
	checkout,
	getCart,
	removeCartItem,
	selectAmountTotal,
	updateQuantityCartItem,
} from 'features/Cart/cartSlice';

import {formatCash} from 'utils';
import gioHangTrongKhongSvg from 'assets/images/gio-hang-trong-khong.svg';

function Cart() {
	const dispatch = useDispatch();
	const {cart, isError, message} = useSelector(state => state.cart);
	const amountTotal = useSelector(selectAmountTotal);
	const [items, setItems] = useState([]);
	const [disableCheckoutButton, setDisableCheckoutButton] = useState(false);

	useEffect(() => {
		dispatch(getCart());
	}, [dispatch]);

	useEffect(() => {
		setItems(cart?.items);
		setDisableCheckoutButton(
			cart?.items.some(item => item?.product?.amount === 0),
		);
		if (cart?.checkout?.url) {
			window.location.href = cart.checkout.url;
		}
	}, [cart]);

	useEffect(() => {
		if (isError) {
			if (typeof message !== 'string') {
				toast.error(message[0]);
			} else {
				toast.error(message);
			}
			dispatch(getCart());
		}
	}, [isError]);
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
		return toast.success('Increment quantity successfully!');
	};

	const onDescrementQuantity = async (
		cartItemId = '',
		productId = '',
		defaultQuantity = 0,
		currentQuantity = 0,
	) => {
		if (defaultQuantity === 0) return;
		dispatch(
			updateQuantityCartItem({
				quantity: defaultQuantity - 1,
				cartItemId,
				productId,
			}),
		);
		return toast.success('Descrement quantiry successfully!');
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
			return toast.success('Update quantity successfully');
		}

		if (event.key === 'Backspace') {
			const data = String(defaultQuantity).slice(0, -1) || '0';
			if (!data) {
				return;
			}
			dispatch(
				updateQuantityCartItem({
					quantity: Number(data),
					cartItemId,
					productId,
				}),
			);
			return toast.success('Update quantity successfully');
		}
	};

	const onDeleteCartItem = async ({cartItemId, productId}) => {
		dispatch(removeCartItem({cartItemId, productId}));
	};

	const onCheckout = async () => {
		// dispatch(getCart());
		// const checked = cart?.items.some(item => item?.product?.amount === 0);
		// setDisableCheckoutButton(checked);
		if (disableCheckoutButton !== true) {
			dispatch(checkout());
		}
	};

	return (
		<Container maxWidth='lg' style={{marginTop: 10}}>
			<Grid container columnSpacing={3}>
				{items && items.length > 0 ? (
					<>
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
								<Box display='flex' justifyContent='space-between'>
									<TypographyCheckout component='p'>Số lượng:</TypographyCheckout>{' '}
									<TypographyCheckout component='p'>{cart.total}</TypographyCheckout>
								</Box>

								<Box display='flex' justifyContent='space-between'>
									<TypographyCheckout component='p'>Tổng tiền:</TypographyCheckout>
									<TypographyCheckout component='p'>
										{formatCash(amountTotal)}
									</TypographyCheckout>
								</Box>

								<Button
									disabled={disableCheckoutButton}
									variant='contained'
									color='info'
									onClick={onCheckout}
									fullWidth
									style={{margin: '10px 0'}}>
									Thanh toán
								</Button>
							</Paper>
						</Grid>
					</>
				) : (
					<Grid item xs={12} sm={12} md={12} lg={12} xl={12} margin>
						<Paper evolution='0'>
							<Box textAlign='center' padding={10}>
								<Typography component='p' marginY={4} fontSize={21} fontWeight='bold'>
									Giỏ hàng trống!
								</Typography>

								<Typography component='p' marginY={4} fontSize={14}>
									Thêm sản phẩm vào giỏ và quay lại trang này để thanh toán nha bạn{' '}
									{'<3'}
								</Typography>

								<DisplayImage image={gioHangTrongKhongSvg} />
							</Box>
						</Paper>
					</Grid>
				)}
			</Grid>
		</Container>
	);
}

const TypographyCheckout = styled(Typography)`
	font-size: 14px;
`;
export default Cart;
