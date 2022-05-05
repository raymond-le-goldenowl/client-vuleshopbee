import styled from '@emotion/styled';
import {Box, Container, Divider, Grid, Paper, Typography} from '@mui/material';
import DisplayImage from 'components/DisplayImage';
import Header from 'components/Header';
import {BASE_SERVER_URL} from 'config/base-url';
import {getOneOrder} from 'containers/Order/orderSlice';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import {formatCash} from 'utils';

function OrderHistoryDetail() {
	const dispatch = useDispatch();
	const [order, setOrder] = useState({});
	const {orders} = useSelector(state => state.order);
	const {id} = useParams();

	useEffect(() => {
		dispatch(getOneOrder(id));
	}, [dispatch]);

	useEffect(() => {
		console.log(orders);
		setOrder(orders[0]);
	}, [orders]);
	return (
		<div className='app-vuleshopbee'>
			<Header />
			<Container maxWidth='lg' sx={{marginTop: 2, padding: 5}}>
				<>
					<Box margin>
						<Typography component='p' fontWeight='bold' fontSize={24}>
							Chi tiết đơn hàng #{`${order?.id}`.split('-').at(0)}
						</Typography>
					</Box>
					<Divider style={{margin: '10px 0 30px 0'}} />
					<Grid margin container>
						<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
							<Typography marginY component='p' fontWeight='bold'>
								Thông tin đơn hàng
							</Typography>
							<Typography marginY component='p'>
								Mã đơn hàng: #{`${order?.id}`.split('-').at(0)}
							</Typography>
							<Typography marginY component='p'>
								Ngày tạo:
								{' ' +
									new Date(order?.created_at).toLocaleString('en-GB', {
										timeZone: 'UTC',
									})}
							</Typography>
							<Typography component='p'>Người nhận: {order?.receiver}</Typography>
						</Grid>

						<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
							<Typography component='p' fontWeight='bold'>
								Giá trị đơn hàng
							</Typography>
							<Typography marginY component='p'>
								Tổng giá trị sản phẩm: {formatCash(order?.amount)}
							</Typography>
						</Grid>
					</Grid>
					<Divider style={{margin: '10px 0 30px 0'}} />
					<Box margin>
						{order?.orderItems &&
							order?.orderItems.map(item => {
								const {product} = item;
								return (
									<Paper key={item?.id}>
										<Grid container spacing={2} marginY padding>
											<Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
												<DisplayImage
													image={BASE_SERVER_URL + '/products/image/' + product?.image}
													style={{height: 200, width: '100%'}}
												/>
											</Grid>
											<Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
												<TypographyStyled component={Link} to={`/product/${product?.id}`}>
													{product?.name}
												</TypographyStyled>
											</Grid>
											<Grid item xs={6} sm={6} md={2} lg={2} xl={2}>
												<TypographyStyled>Số lượng: {item?.quantity}</TypographyStyled>
											</Grid>
											<Grid item xs={6} sm={6} md={2} lg={2} xl={2}>
												<TypographyStyled>{formatCash(product?.price)}</TypographyStyled>
											</Grid>
										</Grid>
									</Paper>
								);
							})}
					</Box>
				</>
			</Container>
		</div>
	);
}

const TypographyStyled = styled(Typography)`
	font-weight: 600;
	font-size: 1.1rem;
	color: #000;
	text-decoration: none;

	&[href]:hover {
		text-decoration: underline;
	}
`;
export default OrderHistoryDetail;
