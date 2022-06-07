import React, {
	forwardRef,
	Fragment,
	useCallback,
	useEffect,
	useState,
} from 'react';
import {
	Grid,
	Paper,
	Typography,
	Button,
	TextField,
	Dialog,
	DialogTitle,
	DialogActions,
	Slide,
	Box,
} from '@mui/material';
import DisplayImage from 'components/DisplayImage';
import {BASE_PRODUCT_IMAGE_URL} from 'api/base-server-url';
import {debounce, formatCash} from 'utils';
import {Link} from 'react-router-dom';
import styled from '@emotion/styled';
import {
	MdKeyboardArrowUp,
	MdKeyboardArrowDown,
	MdDeleteForever,
} from 'react-icons/md';
import {useDispatch, useSelector} from 'react-redux';
import {
	resetError,
	updateOrderLocal,
	updateQuantityOrderItem,
} from 'features/Order/orderSlice';
import {toast} from 'react-toastify';
const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export function RenderListOrderItem({
	orderItems,
	issueItems = [],
	errorCode,
	orderId,
}) {
	let items = orderItems || [];
	if (errorCode) {
		issueItems.forEach(item => {
			items = items.map(item2 => {
				item2 = {...item2, error: false};
				if (item2.id === item.id) {
					item2 = {...item2, error: true};
				}
				return item2;
			});
		});
	}

	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);
	const [cartIdDelete, setOrderIdDelete] = useState({
		orderItemId: null,
		productId: null,
		productName: null,
	});

	// for disable input text (quantity input text)
	const {isLoading, isError, message} = useSelector(state => state.order);

	// show error is has any error
	useEffect(() => {
		if (isError) {
			if (typeof message !== 'string') {
				toast.error(message[0]);
			} else {
				toast.error(message);
			}
			dispatch(resetError());
		}
	}, [isError, message]);

	const optimizedFn = useCallback(
		// for debounce with delay is 500 miliseconds
		debounce(({quantity, orderItemId, productId}) => {
			dispatch(
				updateQuantityOrderItem({
					quantity,
					orderItemId,
					productId,
				}),
			);
		}),
		[],
	);

	// make up quantity
	const onIncrementQuantity = async (
		orderItemId = '',
		productId = '',
		defaultQuantity = 0,
	) => {
		dispatch(
			updateOrderLocal({quantity: defaultQuantity + 1, orderItemId, productId}),
		);
		optimizedFn({quantity: defaultQuantity + 1, orderItemId, productId});
	};

	// make down quantity
	const onDescrementQuantity = async (
		orderItemId = '',
		productId = '',
		defaultQuantity = 0,
	) => {
		if (Number(defaultQuantity - 1) <= 0) return null;
		dispatch(
			updateOrderLocal({quantity: defaultQuantity - 1, orderItemId, productId}),
		);
		optimizedFn({quantity: defaultQuantity - 1, orderItemId, productId});
	};

	// update quantity on change
	const onChangeInput = async (event = {}, orderItemId = '', productId = '') => {
		const data = event?.target?.value;

		const regCheckOnlyNumbers = new RegExp('^[0-9]*$');
		if (regCheckOnlyNumbers.test(data) === false) {
			// return toast.error('Chỉ nhập số');
			return null;
		}
		if (Number(data) <= 0) {
			return null;
		}
		dispatch(updateOrderLocal({quantity: Number(data), orderItemId, productId}));
		optimizedFn({quantity: Number(data), orderItemId, productId});
	};

	// delete cart item
	const onDeleteCartItem = ({orderItemId, productId}) => {
		// dispatch(removeCartItem({orderItemId, productId}));
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

	return items.map(item => {
		const {product} = item;

		return (
			<Fragment key={item?.id}>
				<Paper style={{padding: 10}}>
					<Grid container columnSpacing={{md: 2}} margin='auto'>
						<Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
							<DisplayImage
								image={`${BASE_PRODUCT_IMAGE_URL}/${product?.image}`}
								style={{height: 200, width: '100%'}}
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={2} lg={4} xl={4}>
							<TypographyStyled
								component={Link}
								to={`/shop/${product?.slug}`}
								state={{productId: product?.id}}>
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

					{item?.error && (
						<Grid container display='flex' flexDirection='row' alignItems='center'>
							<Grid item xs={12} sm={12} md={12} lg={6} xl={6} marginY>
								<TextFieldNotiNotBuyStyled>
									Sản phẩm này không thể mua <br />
									Sản phẩm chỉ còn {product?.amount} trong kho
								</TextFieldNotiNotBuyStyled>
							</Grid>
							<Grid
								marginY
								item
								xs={12}
								sm={12}
								md={12}
								lg={6}
								xl={6}
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									flexWrap: 'nowrap',
								}}>
								<Box
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										flexWrap: 'nowrap',
									}}>
									<Button
										disabled={isLoading}
										variant='outlined'
										size='small'
										color='success'
										onClick={() =>
											onIncrementQuantity(item.id, item?.product?.id, item?.quantity, 1)
										}>
										<MdKeyboardArrowUp size={24} />
									</Button>
									<TextFieldProductQuantityStyled
										disabled={isLoading}
										type='text'
										value={item?.quantity}
										onChange={event => {
											onChangeInput(event, item.id, item?.product?.id);
										}}
									/>
									<Button
										disabled={isLoading}
										variant='outlined'
										size='small'
										color='success'
										onClick={() =>
											onDescrementQuantity(item.id, item?.product?.id, item?.quantity, 1)
										}>
										<MdKeyboardArrowDown size={24} />
									</Button>
								</Box>
								<Button
									disabled={isLoading}
									style={{margin: '0 3vw'}}
									variant='contained'
									size='small'
									color='error'
									onClick={() => {
										setOrderIdDelete({
											orderItemId: item?.id,
											productId: item?.product?.id,
											productName: item?.product?.name,
										});
										handleClickOpen();
									}}>
									<MdDeleteForever size={24} />
								</Button>
							</Grid>
						</Grid>
					)}
				</Paper>

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
						<Button onClick={handleClose}>Hủy</Button>
						<Button onClick={confirmDelete}>Xóa</Button>
					</DialogActions>
				</Dialog>
			</Fragment>
		);
	});
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

const TextFieldNotiNotBuyStyled = styled(Typography)`
	font-weight: 600;
	font-size: 1.1rem;
	color: red;
	text-decoration: none;

	&[href]:hover {
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
