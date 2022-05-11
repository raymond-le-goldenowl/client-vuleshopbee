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
	selectTotalPriceOfCart,
} from 'features/Cart/cartSlice';

import {formatCash} from 'utils';
import gioHangTrongKhongSvg from 'assets/images/gio-hang-trong-khong.svg';

function Cart() {
	const dispatch = useDispatch();
	const [items, setItems] = useState([]);
	const [disableCheckoutButton, setDisableCheckoutButton] = useState(false);

	const amountTotal = useSelector(selectTotalPriceOfCart);
	const {cart, isError, message} = useSelector(state => state.cart);

	// get cart info whenever run `dispatch`
	useEffect(() => {
		dispatch(getCart());
	}, [dispatch]);

	// get items from cart and check amount of cart while cart change
	useEffect(() => {
		setItems(cart?.items);

		// if any product has amount equal zero, should disabled checkout button
		setDisableCheckoutButton(
			cart?.items.some(item => item?.product?.amount === 0),
		);
		// if we got a url from cart (that mean checkout success) we will redirect to stipe url to make payment.
		if (cart?.checkout?.url) {
			window.location.href = cart.checkout.url;
		}
	}, [cart]);

	// show error is has any error
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

	// if we got click checkout button, we should run checkout to get checkout url
	const onCheckout = async () => {
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
							<MappedCartItem items={items} />
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
