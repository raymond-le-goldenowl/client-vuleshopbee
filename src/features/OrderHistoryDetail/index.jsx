import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {Box, Container, Divider, Grid, Typography} from '@mui/material';

import {getOneOrder} from 'features/Order/orderSlice';

import {formatCash} from 'utils';
import {toast} from 'react-toastify';
import {reset} from 'features/Product/productSlice';
import RenderListOrderItem from './components/RenderListOrderItem';

function OrderHistoryDetail() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {id} = useParams();
	const {orderDetail, isError, message} = useSelector(state => state.order);

	// get one order detail on any rerender times
	useEffect(() => {
		dispatch(getOneOrder(id));
	}, []);

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
			dispatch(reset());
		}
	}, [isError]);

	return (
		<Container maxWidth='lg' sx={{marginTop: 2, padding: 5}}>
			<Box margin>
				<Typography component='p' fontWeight='bold' fontSize={24}>
					Chi tiết đơn hàng #{`${orderDetail?.id}`.split('-').at(0)}
				</Typography>
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
				</Grid>
			</Grid>
			<Divider style={{margin: '10px 0 30px 0'}} />
			<Box margin>
				{orderDetail?.orderItems && (
					<RenderListOrderItem orderItems={orderDetail?.orderItems || []} />
				)}
			</Box>
		</Container>
	);
}

export default OrderHistoryDetail;
