import styled from '@emotion/styled';
import {Box, Button, Container, Grid, Paper, Typography} from '@mui/material';
import DisplayImage from 'components/DisplayImage';
import Header from 'components/Header';
import MappedCartItem from 'components/MappedCartItem';
import {
	checkout,
	removeCartItem,
	selectAmountTotal,
	updateQuantityCartItem,
} from 'containers/Cart/cartSlice';
import {React, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {formatCash} from 'utils';
import gioHangTrongKhongSvg from 'assets/images/gio-hang-trong-khong.svg';

function Cart() {
	const dispatch = useDispatch();
	const {cart} = useSelector(state => state.cart);
	const amountTotal = useSelector(selectAmountTotal);
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
		<div className='app-vuleshopbee' style={{backgroundColor: '#E7EBF0'}}>
			<Header />
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
									<TypographyCheckout component='p'>
										Số lượng sản phẩm: {cart.total}
									</TypographyCheckout>
									<TypographyCheckout component='p'>
										Tổng giá trị phải thanh toán: {formatCash(amountTotal)}
									</TypographyCheckout>

									<Button
										variant='contained'
										color='info'
										onClick={onCheckout}
										fullWidth>
										Checkout
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
		</div>
	);
}

const TypographyCheckout = styled(Typography)`
	font-size: '1.2rem';
`;
export default Cart;
