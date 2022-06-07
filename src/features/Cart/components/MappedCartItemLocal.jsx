import {forwardRef, useState} from 'react';
import styled from '@emotion/styled';
import {Link} from 'react-router-dom';

import {MdDeleteForever} from 'react-icons/md';
import {AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai';

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
import {BASE_PRODUCT_IMAGE_URL} from 'api/base-server-url';

import RenderTags from 'components/RenderTags';
import DisplayImage from 'components/DisplayImage';
import {TypographySpanStyled} from 'styles';
import {calcSaleOf, formatCash} from 'utils';
import {useDispatch} from 'react-redux';
import {removeItemLocalStorage, updateItemLocalStorage} from '../cartSlice';

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

function MappedCartItemLocal({localItems}) {
	const dispatch = useDispatch();

	// open state for delete modal
	const [open, setOpen] = useState(false);
	const [cartIdDelete, setCartIdDelete] = useState({
		cartItemId: null,
		productId: null,
		productName: null,
	});

	const updateQuantity = (productId, quantity) => {
		dispatch(updateItemLocalStorage({quantity, productId}));
	};
	// delete cart item while submit button
	const confirmDelete = () => {
		const {productId} = cartIdDelete;
		dispatch(removeItemLocalStorage(productId));

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
	if (typeof localItems !== 'object') return [];

	return (
		<>
			{localItems.map(
				cartItem =>
					cartItem && (
						<Paper
							elevation={1}
							key={cartItem?.product?.id}
							style={{padding: 10, marginBottom: 15}}>
							<Box>
								{/* A info of product */}
								<Grid container columnSpacing={3}>
									{/* For image */}
									<Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
										<DisplayImage
											image={`${BASE_PRODUCT_IMAGE_URL}/${cartItem?.product.image}`}
											style={{width: '100%', height: 'auto'}}
											slug={cartItem?.product?.slug}
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
												to={`/shop/${cartItem?.product.slug}`}
												state={{productId: cartItem?.product?.id}}>
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

										{cartItem.quantity === cartItem?.product?.amount && (
											<Box style={{textAlign: 'right'}} color='red'>
												Không thể thêm
											</Box>
										)}

										<Box>
											<Grid
												item
												container
												xs={12}
												sm={12}
												md={12}
												lg={12}
												xl={12}
												sx={{flexDirection: ['column-reverse', 'row']}}>
												<Grid item xs={12} sm={4} md={4} lg={4} xl={4} marginY>
													<Button
														sx={{width: ['100%', '20%']}}
														variant='outlined'
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
													xs={12}
													sm={8}
													md={8}
													lg={8}
													xl={8}
													display='flex'
													flexDirection='row'
													justifyContent='flex-end'
													marginY>
													<Button
														onClick={() => {
															updateQuantity(cartItem?.product?.id, cartItem?.quantity - 1);
														}}
														disabled={
															cartItem?.product?.amount === 0 || cartItem?.quantity === 1
														}
														variant='outlined'
														size='small'
														color='success'>
														<AiOutlineMinus size={24} />
													</Button>
													<TextFieldProductQuantityStyled
														sx={{width: ['100%', '70%']}}
														disabled={
															cartItem?.product?.amount === 0 ||
															cartItem.quantity === cartItem?.product?.amount
														}
														type='text'
														value={cartItem?.quantity}
													/>

													<Button
														onClick={() => {
															updateQuantity(cartItem?.product?.id, cartItem?.quantity + 1);
														}}
														disabled={
															cartItem?.product?.amount === 0 ||
															cartItem.quantity === cartItem?.product?.amount
														}
														variant='outlined'
														size='small'
														color='success'>
														<AiOutlinePlus size={24} />
													</Button>
												</Grid>
											</Grid>
										</Box>
									</Grid>
								</Grid>
							</Box>
						</Paper>
					),
			)}
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
		</>
	);
}

MappedCartItemLocal.propTypes = {};

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

export default MappedCartItemLocal;
