import React, {useState} from 'react';
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

import RenderTags from '../../../components/RenderTags';
import DisplayImage from '../../../components/DisplayImage';
import {TypographySpanStyled} from 'styles';
import {calcSaleOf, formatCash} from 'utils';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

function MappedCartItem({
	onChangeInputQuantity,
	onDescrementQuantity,
	onIncrementQuantity,
	onDeleteCartItem,
	items,
}) {
	const [cartIdDelete, setCartIdDelete] = useState({
		cartItemId: null,
		productId: null,
		productName: null,
	});

	const confirmDelete = () => {
		onDeleteCartItem(cartIdDelete);
		handleClose();
	};

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	if (typeof items !== 'object') return [];
	return (
		<>
			{items.map(cartItem => (
				<Box
					// key={cartItem?.product.id}
					key={cartItem?.id}
					marginY={1}>
					<Paper elevation={1} style={{padding: 10}}>
						{/* A info of product */}
						<Grid
							container
							columnSpacing={3}
							// key={cartItem?.product.id}
						>
							{/* For image */}
							<Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
								<DisplayImage
									image={BASE_SERVER_URL + '/products/image/' + cartItem?.product.image}
									style={{width: '100%', height: 'auto'}}
									slug={cartItem?.product.slug}
								/>
							</Grid>

							{/* For Text values */}
							<Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
								<Box height='80%'>
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

								<Box height='20%'>
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
												type='text'
												onKeyDown={event =>
													onChangeInputQuantity(
														cartItem.id,
														cartItem?.product?.id,
														cartItem.quantity,
														event,
													)
												}
												value={cartItem.quantity}
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
					</Paper>
				</Box>
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
				{/* <DialogContent>
					<DialogContentText id='alert-dialog-slide-description'>
						Let Google help apps determine location. This means sending anonymous
						location data to Google, even when no apps are running.
					</DialogContentText>
				</DialogContent> */}
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
