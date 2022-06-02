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

import {resetCart, selectTotalPriceOfCart} from 'features/Cart/cartSlice';
import {createOrder} from 'features/Order/orderSlice';

import {formatCash} from 'utils';
import gioHangTrongKhongSvg from 'assets/images/gio-hang-trong-khong.svg';
import MappedCartItemLocal from './components/MappedCartItemLocal';
import {getCartLocal} from './cartService';

export function CartPage() {
	const dispatch = useDispatch();
	const [items, setItems] = useState([]);
	const [description, setDescription] = useState('');
	const [userEmailChange, setUserEmailChange] = useState('');
	const [disableCreateOrderButton, setDisableCreateOrderButton] =
		useState(false);
	const [localItems, setLocalItems] = useState([]);

	const [amountTotalLocal, setAmountTotalLocal] = useState(0);
	const amountTotal = useSelector(selectTotalPriceOfCart);
	const {user} = useSelector(state => state.auth);
	const {cart} = useSelector(state => state.cart);
	const {productsByIds} = useSelector(state => state.product);

	// get items from cart and check amount of cart while cart change
	useEffect(() => {
		setItems(cart?.items);
		// if any product has amount equal zero, should disabled checkout button
		setDisableCreateOrderButton(
			cart?.items.some(item => item?.product?.amount === 0),
		);
	}, [cart]);

	useEffect(() => {
		if (productsByIds && productsByIds.length > 0) {
			const cartItemsLocal = getCartLocal();
			const localItemsMapped = productsByIds
				.map(product => {
					const foundProduct = cartItemsLocal.find(
						item => item.productId === product.id,
					);
					if (!foundProduct) return null;
					return {product: product, quantity: foundProduct?.quantity};
				})
				.filter(item => item !== null);

			const amountTotal = localItemsMapped.reduce(
				(prev, curr) => prev + (curr?.product?.price || 0) * (curr?.quantity || 0),
				0,
			);

			setLocalItems(localItemsMapped);
			setAmountTotalLocal(amountTotal);
		}
	}, [productsByIds, cart]);

	// if we got click checkout button, we should run checkout to get checkout url
	const onCreateOrder = async () => {
		if (disableCreateOrderButton === false) {
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
				{(items && items.length > 0) || (localItems && localItems.length > 0) ? (
					<>
						{/* Render items in cart */}
						<Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
							<MappedCartItem items={items} />
						</Grid>

						{/* Render items in cart */}
						<Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
							{localItems && <MappedCartItemLocal localItems={localItems} />}
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
										{formatCash(amountTotal + amountTotalLocal)}
									</TypographyCheckout>
								</Box>

								<Box marginY={3}>
									<TypographyCheckout component='p' fontWeight='bold'>
										Nhập email người nhận:
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
