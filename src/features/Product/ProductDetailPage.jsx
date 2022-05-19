import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';

import styled from '@emotion/styled';
import {toast} from 'react-toastify';

import {MdOutlineAddShoppingCart} from 'react-icons/md';
import {Box, Button, Container, Divider, Grid, Typography} from '@mui/material';

import RenderTags from 'components/RenderTags';
import DisplayImage from 'components/DisplayImage';
import RenderVariants from 'components/RenderVariants';

import {BASE_SERVER_URL} from 'api/base-server-url';
import {getCart, updateCartLocal} from 'features/Cart/cartSlice';
import {getOneProduct, reset} from 'features/Product/productSlice';

import {TypographySpanStyled} from 'styles';
import axiosInstance from 'api/axios-instance';
import {calcSaleOf, debounce, formatCash, renderStringHtml} from 'utils';

export function ProductDetailPage() {
	const {productId} = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [quantity, setQuantity] = useState(1);

	const {user} = useSelector(state => state.auth);
	const {cart} = useSelector(state => state.cart);

	const {product, isError, message} = useSelector(state => state.product);

	const optimizedFn = useCallback(
		// for debounce with delay is 500 miliseconds
		debounce(async ({quantity, productId, cartId}) => {
			if (productId) {
				if (!cartId) {
					// create cart
					return null;
				}
				try {
					// create item with axios post method.
					await axiosInstance.post(`/cart-item`, {
						productId,
						cartId,
						quantity,
					});
				} catch (error) {
					// show error of post fetch method
					toast.error(error.response.data.message);
					toast.error(
						error ||
							error.response ||
							error.response.data ||
							error.response.data.message,
					);
					dispatch(getCart());
					return setQuantity(1);
				}
				// show text add item successfully
				toast.success(`Thêm thành công ${quantity} sản phẩm`);
				setQuantity(1);
			} else {
				// show text add item unsuccessful
				return toast.error('Không thể thêm sản phẩm');
			}
		}),
		[],
	);

	// get product by productId if params change
	useEffect(() => {
		dispatch(getOneProduct(productId));
	}, [productId]);

	// show error is has any error
	useEffect(() => {
		if (isError) {
			if (typeof message !== 'string') {
				toast.error(message[0]);
			} else {
				toast.error(message);
			}
			dispatch(reset());
		}
	}, [isError]);

	// set item to cart
	const onSetItemToCart = async productId => {
		// if not user, will redirect to login,
		// you can not add item if you not logged in
		if (!user) {
			navigate('/login');
		}
		setQuantity(prev => {
			return prev + 1;
		});

		dispatch(updateCartLocal({quantity: cart?.total + 1, productId}));
		optimizedFn({quantity, productId, cartId: user?.cart?.id});
	};

	return (
		<>
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

							{product?.product?.tags.length > 0 && (
								<Box variant='div'>
									<Typography component='span'>Thể loại: </Typography>
									<RenderTags tags={product?.product?.tags} />
								</Box>
							)}
						</Box>

						<Box style={{margin: '20px 0'}}>
							<Box>
								<Typography component='p' variant='h6' style={{fontWeight: 'bold'}}>
									{product?.product?.price && formatCash(product?.product?.price)}
								</Typography>
							</Box>

							<Box>
								<Typography component='del'>
									{product?.product?.original_price &&
										formatCash(product?.product?.original_price)}
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
							{product?.product?.amount === 0 ||
								(cart?.total === product?.product?.amount && (
									<Typography component='p' color='red'>
										Sản phẩm đã hết
									</Typography>
								))}

							<Button
								disabled={
									product?.product?.amount === 0 ||
									cart?.total === product?.product?.amount
								}
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

			<Box style={{backgroundColor: '#f3f4f6', marginTop: 40, padding: '15px 0'}}>
				<Container maxWidth='lg' sx={{marginTop: 2}}>
					{product?.product?.tutorial && (
						<BoxTutorialStyled margin>
							{renderStringHtml(product?.product?.tutorial)}
						</BoxTutorialStyled>
					)}
					{product?.product?.description && (
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
					)}

					{product?.product?.platform && (
						<Grid container marginTop={5}>
							<Grid item xs={12} sm={12} md={3} lg={3} xl={3} marginTop={2}>
								<Typography component='h4' variant='h5' fontWeight='bold'>
									Cấu hình
								</Typography>
							</Grid>
							<Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
								<BoxDescriptionStyled margin>
									{renderStringHtml(product?.product?.platform)}
								</BoxDescriptionStyled>
							</Grid>
						</Grid>
					)}
				</Container>
			</Box>
		</>
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
