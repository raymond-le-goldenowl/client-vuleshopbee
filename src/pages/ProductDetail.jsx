import React, {useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import styled from '@emotion/styled';
import {toast} from 'react-toastify';
import {TypographySpanStyled} from 'styles';
import {Box, Button, Container, Divider, Grid, Typography} from '@mui/material';
import {MdOutlineAddShoppingCart} from 'react-icons/md';

import Header from 'components/Header';
import DisplayImage from 'components/DisplayImage';

import {BASE_SERVER_URL} from 'config/base-url';
import {getOneProduct} from 'containers/Product/productSlice';

import axiosInstance from 'config/axios-instance';
import {calcSaleOf, formatCash, renderStringHtml} from 'utils';
import {getCart} from 'containers/Cart/cartSlice';
import RenderTags from 'components/RenderTags';
import RenderVariants from 'components/RenderVariants';

function ProductDetail() {
	const params = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {product, isLoading, isError, message} = useSelector(
		state => state.product,
	);

	const {user} = useSelector(state => state.auth);

	useEffect(() => {
		const {productId} = params;
		dispatch(getOneProduct(productId));
	}, [params]);

	useEffect(() => {
		if (isError) {
			if (typeof message !== 'string') {
				toast.error(message[0]);
			} else {
				toast.error(message);
			}
		}
	}, [isError, message]);

	if (isLoading) {
		//! return <Spinner />;
	}

	const onSetItemToCart = async productId => {
		if (!user) {
			navigate('/login');
		}
		if (productId) {
			const cartId = user?.cart?.id;
			if (!cartId) {
				// create cart
				return null;
			}

			// create cart_item.
			let cartItemCreated = null;
			try {
				cartItemCreated = await axiosInstance(user?.accessToken).post(
					`/cart-item`,
					{
						productId,
						cartId,
						quantity: 1,
					},
				);
			} catch (error) {
				toast.error(
					error ||
						error.response ||
						error.response.data ||
						error.response.data.message,
				);
			}
			// thêm sản phẩm vào giỏ hàng dựa vào ID product.
			if (!cartItemCreated) {
				return toast.error('Can not add item');
			}
			dispatch(getCart());
			return null;
		}
	};
	return (
		<div className='app-vuleshopbee'>
			<Header />
			<Container maxWidth='lg' sx={{marginTop: 2}}>
				<Grid container columnSpacing={3}>
					<Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
						<DisplayImage
							image={BASE_SERVER_URL + '/products/image/' + product?.product?.image}
							style={{width: '100%', height: 'auto'}}
							slug={product?.product?.slug}
						/>
					</Grid>

					<Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
						<Typography variant='h5' style={{fontWeight: 600}}>
							{product?.product?.name}
						</Typography>

						<Box style={{margin: '20px 0'}}>
							<Box variant='div'>
								Tình trạng:{' '}
								<Typography component='span' style={{color: '#2cbb00'}}>
									{product?.product?.amount > 0 ? 'Còn hàng' : 'Hết hàng'}
								</Typography>
							</Box>

							{product?.tags && (
								<Box variant='div'>
									Thể loại:
									<RenderTags tags={product?.tags} />
								</Box>
							)}
						</Box>

						<Box style={{margin: '20px 0'}}>
							<Box>
								<Typography component='p' variant='h6' style={{fontWeight: 'bold'}}>
									{product?.product?.price && formatCash(product?.product?.price) + ' đ'}
								</Typography>
							</Box>

							<Box>
								<Typography component='del'>
									{product?.product?.original_price &&
										formatCash(product?.product?.original_price) + ' đ'}
								</Typography>

								<TypographySpanStyled component='span' margin>
									-
									{calcSaleOf(
										product?.product?.price || 0,
										product?.product?.original_price || 0,
									)}
									%
								</TypographySpanStyled>
							</Box>
						</Box>

						<Divider />
						<Box style={{margin: '20px 0'}}>
							<Box fontWeight='bold' marginY>
								{product?.product?.variant_title}
							</Box>

							{product?.productsByVariantId && (
								<Box>
									<RenderVariants
										variants={product?.productsByVariantId}
										productId={product?.product?.id}
									/>
								</Box>
							)}
						</Box>
						<Divider />

						<Box marginTop textAlign='right'>
							<Button
								variant='contained'
								onClick={() => onSetItemToCart(product?.product?.id)}
								style={{
									display: 'inline-flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}>
								<MdOutlineAddShoppingCart
									style={{
										fontSize: 22,
										margin: 4,
									}}
								/>
								<Typography component='span'>Thêm vào giỏ hàng</Typography>
							</Button>
						</Box>
					</Grid>
				</Grid>
			</Container>

			{}
			<Box style={{backgroundColor: '#f3f4f6', marginTop: 40, padding: '15px 0'}}>
				<Container maxWidth='lg' sx={{marginTop: 2}}>
					<BoxTutorialStyled margin>
						{renderStringHtml(product?.product?.tutorial)}
					</BoxTutorialStyled>

					<Grid container marginTop={5}>
						<Grid item xs={12} sm={12} md={3} lg={3} xl={3} marginTop={2}>
							<Typography component='h4' variant='h5' fontWeight='bold'>
								Chi tiết sản phẩm
							</Typography>
						</Grid>
						<Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
							<BoxDescriptionStyled margin>
								{renderStringHtml(product?.product?.description)}
							</BoxDescriptionStyled>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</div>
	);
}

const BoxTutorialStyled = styled(Box)`
	& img {
		width: 100%;
		height: 100%;
	}
`;
const BoxDescriptionStyled = styled(Box)`
	& img {
		width: 100%;
		height: 100%;
	}
	& iframe {
		width: 100%;
	}
`;

export default ProductDetail;
