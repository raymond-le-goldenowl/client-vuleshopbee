import {forwardRef, useCallback, useState} from 'react';
import styled from '@emotion/styled';
import {Link} from 'react-router-dom';

import {
	MdDeleteForever,
	MdKeyboardArrowDown,
	MdKeyboardArrowUp,
} from 'react-icons/md';

import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	Grid,
	Paper,
	Slide,
	TextField,
	Typography,
} from '@mui/material';
import {BASE_SERVER_URL} from 'api/base-server-url';

import RenderTags from 'components/RenderTags';
import DisplayImage from 'components/DisplayImage';
import {TypographySpanStyled} from 'styles';
import {calcSaleOf, debounce, formatCash} from 'utils';
import {useDispatch, useSelector} from 'react-redux';
import {
	removeCartItem,
	updateCartLocal,
	updateQuantityCartItem,
} from '../cartSlice';

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

function MappedCartItem({items}) {
	const dispatch = useDispatch();

	// open state for delete modal
	const [open, setOpen] = useState(false);
	const [cartIdDelete, setCartIdDelete] = useState({
		cartItemId: null,
		productId: null,
		productName: null,
	});

	const optimizedFn = useCallback(
		// for debounce with delay is 500 miliseconds
		debounce(({quantity, cartItemId, productId}) => {
			dispatch(
				updateQuantityCartItem({
					quantity,
					cartItemId,
					productId,
				}),
			);
		}),
		[],
	);

	// for disable input text (quantity input text)
	const {isLoading} = useSelector(state => state.cart);

	// make up quantity
	const onIncrementQuantity = async (
		cartItemId = '',
		productId = '',
		defaultQuantity = 0,
		currentQuantity = 0,
	) => {
		dispatch(
			updateCartLocal({quantity: defaultQuantity + 1, cartItemId, productId}),
		);
		optimizedFn({quantity: defaultQuantity + 1, cartItemId, productId});
	};

	// make down quantity
	const onDescrementQuantity = async (
		cartItemId = '',
		productId = '',
		defaultQuantity = 0,
		currentQuantity = 0,
	) => {
		if (defaultQuantity === 0) return;
		dispatch(
			updateCartLocal({quantity: defaultQuantity - 1, cartItemId, productId}),
		);
		optimizedFn({quantity: defaultQuantity - 1, cartItemId, productId});
	};

	// update quantity on change
	const onChangeInput = async (
		cartItemId = '',
		productId = '',
		defaultQuantity = 0,
		event = {},
	) => {
		const data = event.target.value;

		dispatch(updateCartLocal({quantity: Number(data), cartItemId, productId}));
		optimizedFn({quantity: Number(data), cartItemId, productId});
	};

	// delete cart item
	const onDeleteCartItem = ({cartItemId, productId}) => {
		dispatch(removeCartItem({cartItemId, productId}));
	};

	// delete cart item while submit button
	const confirmDelete = () => {
		onDeleteCartItem(cartIdDelete);
		handleClose();
	};

	// click to open delete modal
	const handleClickOpen = () => {
		setOpen(true);
	};

	// click to close delete modal
	const handleClose = () => {
		setOpen(false);
	};

	// return empty array if items props value not a object (not an array)
	if (typeof items !== 'object') return [];

	return (
		<>
			{items.map(cartItem => (
				<Paper
					elevation={1}
					key={cartItem?.id}
					style={{padding: 10, marginBottom: 15}}>
					<Box>
						{/* A info of product */}
						<Grid container columnSpacing={3}>
							{/* For image */}
							<Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
								<DisplayImage
									image={BASE_SERVER_URL + '/products/image/' + cartItem?.product.image}
									style={{width: '100%', height: 'auto'}}
									slug={cartItem?.product.slug}
								/>
							</Grid>

							{/* For Text values */}
							<Grid
								item
								container
								justifyContent='space-between'
								flexDirection='column'
								xs={12}
								sm={12}
								md={7}
								lg={7}
								xl={7}>
								<Box marginY>
									<TypographyNameStyled
										variant='p'
										component={Link}
										to={`/product/${cartItem?.product.id}`}>
										{cartItem?.product.name}
									</TypographyNameStyled>

									{cartItem?.tags && (
										<Box variant='div'>
											Thể loại:
											<RenderTags tags={cartItem?.tags} />
										</Box>
									)}

									<Typography component='p' style={{fontWeight: 'bold'}}>
										{cartItem?.product.price && formatCash(cartItem?.product.price)}
									</Typography>

									<Typography component='del'>
										{cartItem?.product.original_price &&
											formatCash(cartItem?.product.original_price)}
									</Typography>

									<TypographySpanStyled component='span' margin>
										-
										{calcSaleOf(
											cartItem?.product.price || 0,
											cartItem?.product.original_price || 0,
										)}
										%
									</TypographySpanStyled>

									<Typography component='p'>
										Tình trạng:{' '}
										<Typography component='span' style={{color: '#2cbb00'}}>
											{cartItem?.product.amount > 0 ? 'Còn hàng' : 'Hết hàng'}
										</Typography>
									</Typography>

									{cartItem?.product.amount === 0 && (
										<Typography component='div' style={{color: 'red'}} marginY>
											Bạn không thể mua sản phẩm này. Hãy xóa sản phẩm khỏi giỏ hàng
										</Typography>
									)}
								</Box>

								<Box>
									<Grid item container xs={12} sm={12} md={12} lg={12} xl={12}>
										<Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
											<Button
												variant='contained'
												size='small'
												color='error'
												onClick={() => {
													setCartIdDelete({
														cartItemId: cartItem?.id,
														productId: cartItem?.product?.id,
														productName: cartItem?.product?.name,
													});
													handleClickOpen();
												}}>
												<MdDeleteForever size={24} />
											</Button>
										</Grid>

										<Grid
											item
											xs={8}
											sm={8}
											md={8}
											lg={8}
											xl={8}
											display='flex'
											flexDirection='row'>
											<Button
												variant='outlined'
												size='small'
												color='success'
												onClick={() =>
													onIncrementQuantity(
														cartItem.id,
														cartItem?.product?.id,
														cartItem?.quantity,
														1,
													)
												}>
												<MdKeyboardArrowUp size={24} />
											</Button>
											<TextFieldProductQuantityStyled
												disabled={isLoading}
												type='text'
												value={cartItem?.quantity}
												onChange={event => {
													onChangeInput(
														cartItem.id,
														cartItem?.product?.id,
														cartItem.quantity,
														event,
													);
												}}
											/>
											<Button
												variant='outlined'
												size='small'
												color='success'
												onClick={() =>
													onDescrementQuantity(
														cartItem.id,
														cartItem?.product?.id,
														cartItem?.quantity,
														1,
													)
												}>
												<MdKeyboardArrowDown size={24} />
											</Button>
										</Grid>
									</Grid>
								</Box>
							</Grid>
						</Grid>
					</Box>
				</Paper>
			))}
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby='alert-dialog-slide-description'>
				<DialogTitle>
					Xóa sản phẩm{' '}
					<Typography fontWeight={'bold'} component='i'>
						{cartIdDelete.productName}
					</Typography>{' '}
					khỏi giỏ hàng.
				</DialogTitle>
				<DialogActions>
					<Button onClick={handleClose}>Disagree</Button>
					<Button onClick={confirmDelete}>Agree</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

MappedCartItem.propTypes = {};

const TypographyNameStyled = styled(Typography)`
	font-weight: 600;
	color: #000;
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}
`;

const TextFieldProductQuantityStyled = styled(TextField)`
	& .MuiOutlinedInput-root {
		height: 32px;
		min-width: 50px;
	}

	& .MuiOutlinedInput-input {
		min-width: 50px;
		height: 32px;
		padding-top: 0;
		padding-bottom: 0;
		text-align: center;
	}
`;

export default MappedCartItem;
