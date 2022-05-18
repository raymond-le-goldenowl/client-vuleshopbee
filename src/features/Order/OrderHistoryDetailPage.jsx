import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {Box, Button, Container, Divider, Grid, Typography} from '@mui/material';

import {getOneOrder} from 'features/Order/orderSlice';

import {formatCash} from 'utils';
import {toast} from 'react-toastify';
import {RenderListOrderItem} from './components/RenderListOrderItem';
import {checkout, resetError} from 'features/Stripe/stripeSlice';
import {cancelOrder} from 'features/Order/orderService';

export function OrderHistoryDetailPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {id} = useParams();

	const {stripe, isError, message, errorCode} = useSelector(
		state => state.stripe,
	);
	const {orderDetail, isLoading} = useSelector(state => state.order);
	// get one order detail on any rerender times
	useEffect(() => {
		dispatch(getOneOrder(id));
	}, [stripe, dispatch]);

	useEffect(() => {}, [orderDetail]);
	// show error is has any error
	useEffect(() => {
		if (isError) {
			if (message === 500) {
				navigate('/account/order');
			}
			if (typeof message !== 'string') {
				toast.error(message[0]);
			} else {
				toast.error(message);
			}
			dispatch(resetError());
		}
	}, [isError, message]);

	useEffect(() => {
		// if we got a url from stripe (that mean checkout success) we will redirect to stipe url to make payment.
		if (stripe?.checkout?.url) {
			window.location.href = stripe.checkout.url;
		}
	}, [stripe]);

	const handleCancelOrder = async () => {
		const data = await cancelOrder(orderDetail?.id);
		if (data) {
			dispatch(getOneOrder(id));
		}
	};

	const handleCheckout = () => {
		// dispatch checkout with order id.
		dispatch(checkout(orderDetail?.id));
	};

	return (
		<Container maxWidth='lg' sx={{marginTop: 2, padding: 5}}>
			<Box margin>
				<Typography component='p' fontWeight='bold' fontSize={24}>
					Chi tiết đơn hàng #{`${orderDetail?.id}`.split('-').at(0)}
				</Typography>
				{orderDetail?.deleted_at && (
					<Typography
						marginY
						component='p'
						style={{color: 'red', fontSize: '1.1rem', fontWeight: 'bold'}}>
						Đã hủy hóa đơn
					</Typography>
				)}
			</Box>
			<Divider style={{margin: '10px 0 30px 0'}} />
			<Grid margin container>
				<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
					<Typography marginY component='p' fontWeight='bold'>
						Thông tin đơn hàng
					</Typography>
					<Typography marginY component='p'>
						Mã đơn hàng: #{`${orderDetail?.id}`.split('-').at(0)}
					</Typography>
					<Typography marginY component='p'>
						Ngày tạo:
						{' ' +
							new Date(orderDetail?.created_at).toLocaleString('en-GB', {
								timeZone: 'UTC',
							})}
					</Typography>
					<Typography component='p'>Người nhận: {orderDetail?.receiver}</Typography>
				</Grid>

				<Grid
					item
					xs={12}
					sx={{margin: {xs: '15px 0', md: '0'}}}
					sm={6}
					md={6}
					lg={6}
					xl={6}>
					<Typography component='p' fontWeight='bold'>
						Giá trị đơn hàng
					</Typography>
					<Typography marginY component='p'>
						Tổng giá trị sản phẩm: {formatCash(orderDetail?.amount)}
					</Typography>
					<Typography marginY component='p'>
						Tổng số lượng: {orderDetail?.total}
					</Typography>

					{orderDetail?.deleted_at === null && orderDetail?.status === false && (
						<Box style={{display: 'flex', flexDirection: 'row'}}>
							<Box style={{flex: 1}}>
								<Button
									onClick={handleCheckout}
									color='success'
									variant='contained'
									disabled={isLoading}>
									Thanh toán
								</Button>
							</Box>
							<Box style={{flex: 1}}>
								<Button
									onClick={handleCancelOrder}
									color='warning'
									variant='contained'
									disabled={isLoading}>
									Hủy hóa đơn
								</Button>
							</Box>
						</Box>
					)}
				</Grid>
			</Grid>
			<Divider style={{margin: '10px 0 30px 0'}} />
			<Box margin>
				{orderDetail?.orderItems && (
					<RenderListOrderItem
						orderItems={orderDetail?.orderItems || []}
						issueItems={stripe?.issueItems}
						errorCode={errorCode}
						orderId={id}
					/>
				)}
			</Box>
		</Container>
	);
}
