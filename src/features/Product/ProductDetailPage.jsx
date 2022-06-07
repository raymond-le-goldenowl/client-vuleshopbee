import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate, useParams} from 'react-router-dom';

import styled from '@emotion/styled';
import {toast} from 'react-toastify';
import {
	AppBar,
	Box,
	Button,
	Container,
	Divider,
	Grid,
	Toolbar,
	Typography,
} from '@mui/material';
import {MdOutlineAddShoppingCart} from 'react-icons/md';
import {AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai';

import RenderTags from 'components/RenderTags';
import DisplayImage from 'components/DisplayImage';
import RenderVariants from 'components/RenderVariants';

import {BASE_PRODUCT_IMAGE_URL} from 'api/base-server-url';
import {getCart, saveItemsToLocalStorage} from 'features/Cart/cartSlice';
import {getOneProduct, reset} from 'features/Product/productSlice';

import axiosInstance from 'api/axios-instance';
import {calcSaleOf, debounce, formatCash, renderStringHtml} from 'utils';
import RenderListProduct from 'components/RenderListProduct';

export function ProductDetailPage() {
	const dispatch = useDispatch();
	const location = useLocation();

	const productId = location.state?.productId;

	const [quantity, setQuantity] = useState(1);
	const [isOutOfStock, setIsOutOfStock] = useState(false);

	const {user} = useSelector(state => state.auth);
	const {cart, isLoading: isLoadingCart} = useSelector(state => state.cart);

	const {
		product,
		isError,
		message,
		isLoading: isLoadingProduct,
	} = useSelector(state => state.product);

	const optimizedFn = useCallback(
		// for debounce with delay is 500 miliseconds
		debounce(async ({quantity, productId, cartId}) => {
			if (productId) {
				if (!cartId) {
					// save to local.
					dispatch(saveItemsToLocalStorage({quantity, productId}));
					// create cart
				} else {
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
						return setQuantity(1);
					}
					dispatch(getCart());
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

	useEffect(() => {
		setQuantity(1);
		window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
	}, [location?.pathname]);

	// get product by productId if params change
	useEffect(() => {
		dispatch(getOneProduct(productId));
	}, [location.state]);

	useEffect(() => {
		const productQuantity =
			cart?.items.find(item => item.product.id === productId)?.quantity || 0;

		if (
			product?.product?.amount === 0 ||
			productQuantity === product?.product?.amount
		) {
			setIsOutOfStock(true);
		} else {
			setIsOutOfStock(false);
		}
	}, [product, cart]);

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
		const productQuantity =
			cart?.items.find(item => item.product.id === productId)?.quantity || 0;

		if (productQuantity === 0) {
			if (
				product?.product?.amount === 0 ||
				quantity - 1 === product?.product?.amount
			) {
				setIsOutOfStock(true);
				return null;
			} else {
				setIsOutOfStock(false);
			}
		} else {
			if (
				product?.product?.amount === 0 ||
				productQuantity === product?.product?.amount
			) {
				setIsOutOfStock(true);
				return null;
			} else {
				setIsOutOfStock(false);
			}
		}

		optimizedFn({quantity, productId, cartId: user?.cart?.id});
	};

	const onChangeQuantity = quantity => {
		const quantityOfProductInCart = cart?.items.find(
			item => item.product.id === product.product.id,
		);
		const currentQuantityProduct =
			product?.product?.amount - (quantityOfProductInCart?.quantity || 0);
		if (quantity >= 1 && quantity <= currentQuantityProduct)
			setQuantity(quantity);
	};
	return (
		<>
			<Container maxWidth='lg' sx={{marginTop: 2}}>
				{/* Product name */}
				<Typography
					variant='h5'
					style={{
						display: 'block',
						fontSize: '1.5rem',
						fontWeight: 600,
						marginBottom: '2.9375rem',
						color: '#202435',
					}}>
					{product?.product?.name}
				</Typography>

				<Grid container columnSpacing={2}>
					{/* Product Image */}
					<Grid item xs={12} sm={12} md={7} lg={7} xl={7} position='relative'>
						<DisplayImage
							image={`${BASE_PRODUCT_IMAGE_URL}/${product?.product?.image}`}
							style={{width: '100%', height: 'auto'}}
							slug={product?.product?.slug}
						/>
						<TypographySaleOfText component='span' margin>
							-
							{calcSaleOf(
								product?.product?.price || 0,
								product?.product?.original_price || 0,
							)}
							%
						</TypographySaleOfText>
					</Grid>

					<Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
						{/* Price Of Product */}
						<Box style={{margin: '10px 0'}}>
							<TypographyProductOriginalPriceStyled component='del'>
								{product?.product?.original_price &&
									formatCash(product?.product?.original_price)}
							</TypographyProductOriginalPriceStyled>
							<TypographyProductPriceStyled
								component='p'
								variant='h6'
								style={{
									display: 'inline-block',
									marginLeft: '10px',
								}}>
								{product?.product?.price && formatCash(product?.product?.price)}
							</TypographyProductPriceStyled>
						</Box>

						{/* Status of product */}
						<Box variant='div' style={{margin: '10px 0'}}>
							<Typography
								component='span'
								style={{
									backgroundColor: '#e5f8ed',
									color: '#038e42',
									padding: '3px 5px',
									borderRadius: '25px',
								}}>
								{product?.product?.amount > 0 ? 'Còn hàng' : 'Hết hàng'}
							</Typography>
						</Box>

						{/* Tags */}
						{product?.tags?.length > 0 && (
							<Box variant='div' style={{margin: '10px 0'}}>
								<Typography component='span' style={{fontWeight: 'bold'}}>
									Thể loại:
								</Typography>
								<RenderTags tags={product?.tags} />
							</Box>
						)}
						<Divider />

						{/* Variant products */}
						<Box style={{margin: '10px 0'}}>
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

						{/* Add product to Cart */}
						<Box
							marginTop
							textAlign='right'
							sx={{
								display: {xs: 'none', sm: 'none', md: 'block'},
							}}>
							<Box
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
								}}>
								{(isOutOfStock ||
									product?.product?.amount === 0 ||
									cart?.total === product?.product?.amount) && (
									<Typography component='p' color='red'>
										Sản phẩm đã hết
									</Typography>
								)}
								<Box
									style={{
										width: '100%',
										display: 'flex',
										justifyContent: 'space-between',
									}}>
									<Box>
										<ButtonPlusAndMinusStyled
											disabled={isOutOfStock}
											disableRipple={true}
											onClick={() => onChangeQuantity(quantity - 1)}>
											<AiOutlineMinus />
										</ButtonPlusAndMinusStyled>
										<Typography
											component='span'
											style={{
												color: '#000',
												display: 'inline-block',
												width: '40px',
												textAlign: 'center',
											}}>
											{isOutOfStock ? 0 : quantity}
										</Typography>
										<ButtonPlusAndMinusStyled
											disabled={isOutOfStock}
											disableRipple={true}
											onClick={() => onChangeQuantity(quantity + 1)}>
											<AiOutlinePlus />
										</ButtonPlusAndMinusStyled>
									</Box>
									<Button
										disabled={isOutOfStock || isLoadingProduct || isLoadingCart}
										variant='contained'
										onClick={() => onSetItemToCart(product?.product?.id)}
										style={{
											display: 'inline-flex',
											justifyContent: 'center',
											alignItems: 'center',
											color: '#fff',
											backgroundColor: '#233a95',
											borderRadius: '50px',
											cursor: 'pointer',
										}}>
										<MdOutlineAddShoppingCart
											style={{
												fontSize: 22,
											}}
										/>
										<Typography component='span' style={{fontSize: '13px'}}>
											Thêm vào giỏ hàng
										</Typography>
									</Button>
								</Box>
							</Box>
						</Box>

						<AppBarFixedAtBottomStyled
							position='fixed'
							color='primary'
							sx={{
								top: 'auto',
								bottom: 0,
								display: {xs: 'block', sm: 'block', md: 'none'},
							}}>
							{(isOutOfStock ||
								product?.product?.amount === 0 ||
								cart?.total === product?.product?.amount) && (
								<Typography
									component='p'
									style={{
										textAlign: 'right',
										color: 'red',
									}}>
									Sản phẩm đã hết
								</Typography>
							)}
							<ToolbarFixedAtBottomStyled>
								<Box
									style={{
										width: '100%',
										display: 'flex',
										justifyContent: 'space-between',
									}}>
									<Box
										style={{
											display: 'flex',
											justifyContent: 'space-around',
											alignItems: 'center',
										}}>
										<ButtonPlusAndMinusStyled
											disabled={isOutOfStock}
											disableRipple={true}
											onClick={() => onChangeQuantity(quantity - 1)}>
											<AiOutlineMinus />
										</ButtonPlusAndMinusStyled>
										<Typography
											component='span'
											style={{
												color: '#000',
												display: 'inline-block',
												width: '50px',
												textAlign: 'center',
											}}>
											{isOutOfStock ? 0 : quantity}
										</Typography>
										<ButtonPlusAndMinusStyled
											disabled={isOutOfStock}
											disableRipple={true}
											onClick={() => onChangeQuantity(quantity + 1)}>
											<AiOutlinePlus />
										</ButtonPlusAndMinusStyled>
									</Box>
									<Button
										disabled={isOutOfStock || isLoadingProduct || isLoadingCart}
										variant='contained'
										onClick={() => onSetItemToCart(product?.product?.id)}
										style={{
											display: 'inline-flex',
											justifyContent: 'center',
											alignItems: 'center',
											color: '#fff',
											backgroundColor: '#233a95',
											borderRadius: '25px',
											cursor: 'pointer',
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
							</ToolbarFixedAtBottomStyled>
						</AppBarFixedAtBottomStyled>
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

			<Box style={{backgroundColor: '#f3f4f6', padding: '40px 0 15px 0'}}>
				<Container maxWidth='lg'>
					<Typography
						component='h4'
						style={{
							fontSize: '20px',
							textTransform: 'uppercase',
							fontWeight: 600,
							marginBottom: '20px',
							color: '#202435',
						}}>
						RELATED PRODUCTS
					</Typography>

					<RenderListProduct products={product?.productsByVariantId} />
				</Container>
			</Box>
		</>
	);
}

const ButtonPlusAndMinusStyled = styled(Button)`
	transition: all 0.2s cubic-bezier(0.28, 0.12, 0.22, 1);
	width: 2.75rem;
	height: 2.75rem;
	border-radius: 50%;
	color: #000;
	background-color: #edeef5;
	min-width: inherit;
	display: inline-block;

	&:hover {
		background-color: #ffcd00;
	}
`;

const ToolbarFixedAtBottomStyled = styled(Toolbar)`
	justify-content: flex-end;
	box-shadow: 0 -2px 5px rgb(0 0 0 / 7%);
	& *,
	& a {
		font-size: 13px;
	}
`;

const AppBarFixedAtBottomStyled = styled(AppBar)`
	background-color: #fff;
`;

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

const TypographySaleOfText = styled(Typography)`
	position: absolute;
	top: 0.9375rem;
	left: 1.9375rem;

	color: #fff;
	background-color: #2bbef9;

	font-size: 12px;
	border-radius: 4px;
	max-height: 1.5rem;
	padding: 0.1rem 0.4rem;
`;

const TypographyProductPriceStyled = styled(Typography)`
	letter-spacing: 0.0001rem;
	font-size: 22px;
	color: #d51243;
`;

const TypographyProductOriginalPriceStyled = styled(Typography)`
	letter-spacing: 0.0001rem;
	font-size: 18px;
	color: #c2c2d3;
`;
