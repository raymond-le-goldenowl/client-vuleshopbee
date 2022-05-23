import {React, useEffect, useState} from 'react';

import {toast} from 'react-toastify';
import styled from '@emotion/styled';
import {useDispatch, useSelector} from 'react-redux';
import {
	Box,
	Button,
	Container,
	Grid,
	Paper,
	TextField,
	Typography,
} from '@mui/material';

import DisplayImage from 'components/DisplayImage';
import MappedCartItem from 'features/Cart/components/MappedCartItem';

import {
	getCart,
	resetCart,
	resetError,
	selectTotalPriceOfCart,
} from 'features/Cart/cartSlice';
import {createOrder} from 'features/Order/orderSlice';

import {formatCash} from 'utils';
import gioHangTrongKhongSvg from 'assets/images/gio-hang-trong-khong.svg';

export function CartPage() {
	const dispatch = useDispatch();
	const [items, setItems] = useState([]);
	const [description, setDescription] = useState('');
	const [userEmailChange, setUserEmailChange] = useState('');
	const [disableCreateOrderButton, setDisableCreateOrderButton] =
		useState(false);

	const amountTotal = useSelector(selectTotalPriceOfCart);
	const {user} = useSelector(state => state.auth);
	const {cart, isError, message} = useSelector(state => state.cart);

	// get email from user
	useEffect(() => {
		setUserEmailChange(user?.email);
	}, [user]);

	// get items from cart and check amount of cart while cart change
	useEffect(() => {
		setItems(cart?.items);

		// if any product has amount equal zero, should disabled checkout button
		setDisableCreateOrderButton(
			cart?.items.some(item => item?.product?.amount === 0),
		);
	}, [cart]);

	// show error is has any error
	useEffect(() => {
		if (isError) {
			if (typeof message !== 'string') {
				toast.error(message[0]);
			} else {
				toast.error(message);
			}
			dispatch(resetError());
			dispatch(getCart());
		}
	}, [isError]);

	// if we got click checkout button, we should run checkout to get checkout url
	const onCreateOrder = async () => {
		if (disableCreateOrderButton !== true) {
			const dispatchCreateOrder = await dispatch(
				createOrder({
					description: description,
					receiver: userEmailChange || user?.email,
				}),
			);
			const orderId = dispatchCreateOrder?.payload?.id;
			if (orderId) {
				// remove cart
				dispatch(resetCart());
				window.location.href = `/account/order/${orderId}`;
			} else {
				toast.error(dispatchCreateOrder?.payload || '', {
					autoClose: 3000,
				});
			}
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
							<Paper evolution={2} style={{padding: 10}}>
								<Box display='flex' justifyContent='space-between' marginY>
									<TypographyCheckout component='p'>Số lượng:</TypographyCheckout>{' '}
									<TypographyCheckout component='p'>{cart.total}</TypographyCheckout>
								</Box>

								<Box display='flex' justifyContent='space-between' marginY>
									<TypographyCheckout component='p'>Tổng tiền:</TypographyCheckout>
									<TypographyCheckout component='p'>
										{formatCash(amountTotal)}
									</TypographyCheckout>
								</Box>

								<Box marginY={3}>
									<TypographyCheckout component='p' fontWeight='bold'>
										Nhập email người nhập:
									</TypographyCheckout>
									<TextField
										size='small'
										fullWidth
										type='text'
										value={userEmailChange}
										onChange={({target}) => setUserEmailChange(target.value)}
									/>

									<TextField
										size='small'
										style={{margin: '10px 0'}}
										value={description}
										placeholder='Thông tin thêm'
										rows={10}
										fullWidth
										onChange={({target}) => setDescription(target.value)}
									/>
								</Box>
								<Button
									disabled={disableCreateOrderButton}
									variant='contained'
									color='info'
									onClick={() => onCreateOrder()}
									fullWidth
									style={{margin: '10px 0'}}>
									{/* Thanh toán */}
									Tạo đơn hàng
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
