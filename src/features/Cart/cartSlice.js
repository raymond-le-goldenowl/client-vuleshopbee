import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import cartService from './cartService';

const initialState = {
	cart: {
		total: 0,
		items: [],
		cartId: '',
		checkout: {},
	},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

// Get user goals
export const getCart = createAsyncThunk('cart/get-one', async (_, thunkAPI) => {
	try {
		// fetching to get cart info.
		const cart = await cartService.getCart();

		// calculate total of product quantity in cart
		const total = cart?.cartItem.reduce(
			(previousValue, currentValue, _currentIndex, _array) => {
				return previousValue + currentValue.quantity;
			},
			0,
		);

		return {items: cart.cartItem, total, cartId: cart?.id};
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// updateQuantityCartItem
export const updateQuantityCartItem = createAsyncThunk(
	'cart/update-quantity-cart-item',
	async ({quantity, cartItemId, productId}, thunkAPI) => {
		try {
			// get cart from state to get cartId.
			const cart = thunkAPI.getState().cart.cart;

			const updated = await cartService.updateQuantityCartItem(
				quantity,
				// passing cartId
				cart.cartId,
				cartItemId,
				productId,
			);

			// make new cart items
			const items = cart?.items.map(item => {
				if (item?.id === updated?.id) {
					return updated;
				}
				return item;
			});

			// calculate total of product quantity in cart
			const total = items.reduce(
				(previousValue, currentValue, _currentIndex, _array) => {
					return previousValue + currentValue.quantity;
				},
				0,
			);

			return {items: items, total, cartId: cart?.cartId};
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	},
);

// removeCartItem
export const removeCartItem = createAsyncThunk(
	'cart/remove-cart-item',
	async ({cartItemId, productId}, thunkAPI) => {
		try {
			// get cart from state to get cartId.
			const cart = thunkAPI.getState().cart.cart;

			await cartService.removeCartItem(
				cartItemId,
				true,
				// passing cartId
				cart.cartId,
				productId,
			);

			// remove product item from cart
			const items = cart?.items.filter(item => item?.id !== cartItemId);

			// re calculate total of product quantity in cart
			const total = items.reduce(
				(previousValue, currentValue, _currentIndex, _array) => {
					return previousValue + currentValue.quantity;
				},
				0,
			);

			return {items: items, total, cartId: cart?.cartId};
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	},
);

export const checkout = createAsyncThunk(
	'cart/checkout',
	async (orderId, thunkAPI) => {
		try {
			//if fine all, let's checkout right here
			const data = await cartService.checkout(orderId);
			const checkout = data?.checkoutSessions;

			// save ClientSecret (ClientSecret from checkout response data)
			sessionStorage.setItem('cs', checkout.id);
			sessionStorage.setItem('orderId', data.orderId);
			// trả về thông tin order chưa được thanh toán.

			// nhập vào order tại local,

			// trả về cho store để hiển thị.
			return checkout;
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	},
);

export const resetCart = createAsyncThunk('cart/reset', async (_, thunkAPI) => {
	try {
		// save all data from cart item to order item,
		await cartService.reset();

		// remove ClientSecret
		sessionStorage.removeItem('cs');
		sessionStorage.removeItem('orderId');

		// reset all
		return {
			cart: {
				total: 0,
				items: [],
				checkout: {},
			},
			isError: false,
			isSuccess: false,
			isLoading: false,
			message: '',
		};
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Create and Export Slice
export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		resetError: (state, action) => {
			state.isError = false;
			state.isSuccess = false;
			state.isLoading = false;
			state.message = '';
		},
		// update at local (use this function with debounce issue)
		updateCartLocal: (state, action) => {
			const {quantity, cartItemId} = action.payload;

			// get cart items
			const currentItems = state.cart?.items;
			// update quantity of cart item
			const itemsUpdated = currentItems.map(item => {
				if (item?.id === cartItemId) {
					item.quantity = quantity;
				}
				return item;
			});

			// calculate total of product quantity in cart
			const total = itemsUpdated.reduce(
				(previousValue, currentValue, _currentIndex, _array) => {
					return previousValue + currentValue.quantity;
				},
				0,
			);

			// set data
			state.cart.items = itemsUpdated;
			state.cart.total = total;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getCart.pending, state => {
				state.isLoading = true;
			})
			.addCase(getCart.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.cart = action.payload;
			})
			.addCase(getCart.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				if (action.payload === 'Network Error') {
					state.message = 'Không thể kết nối tới server';
				}
			})

			.addCase(updateQuantityCartItem.pending, state => {
				state.isLoading = true;
			})
			.addCase(updateQuantityCartItem.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.cart = action.payload;
			})
			.addCase(updateQuantityCartItem.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				if (action.payload === 'Network Error') {
					state.message = 'Không thể kết nối tới server';
				}
			})

			.addCase(removeCartItem.pending, state => {
				state.isLoading = true;
			})
			.addCase(removeCartItem.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.cart = action.payload;
			})
			.addCase(removeCartItem.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				if (action.payload === 'Network Error') {
					state.message = 'Không thể kết nối tới server';
				}
			})

			.addCase(checkout.pending, state => {
				state.isLoading = true;
			})
			.addCase(checkout.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.cart.checkout = action.payload;
			})
			.addCase(checkout.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				if (action.payload === 'Network Error') {
					state.message = 'Không thể kết nối tới server';
				}
			})

			.addCase(resetCart.pending, state => {
				state.isLoading = true;
			})
			.addCase(resetCart.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state = action.payload;
			})
			.addCase(resetCart.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				if (action.payload === 'Network Error') {
					state.message = 'Không thể kết nối tới server';
				}
			});
	},
});

export const selectTotalPriceOfCart = state => {
	return state?.cart?.cart?.items?.reduce(
		(pre, curr, currIdx, arr) => pre + curr.quantity * curr.product.price,
		0,
	);
};

export const {updateCartLocal, resetError} = cartSlice.actions;
export default cartSlice.reducer;
