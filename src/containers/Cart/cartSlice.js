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
		const accessToken = thunkAPI.getState().auth.user.accessToken;
		const cart = await cartService.getCart(accessToken);

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
			const accessToken = thunkAPI.getState().auth.user.accessToken;
			const cart = thunkAPI.getState().cart.cart;

			const updated = await cartService.updateQuantityCartItem(
				quantity,
				cart.cartId,
				cartItemId,
				productId,
				accessToken,
			);

			const items = cart?.items.map(item => {
				if (item?.id === updated?.id) {
					return updated;
				}
				return item;
			});

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
			const accessToken = thunkAPI.getState().auth.user.accessToken;
			const cart = thunkAPI.getState().cart.cart;

			const updated = await cartService.removeCartItem(
				cartItemId,
				true,
				cart.cartId,
				productId,
				accessToken,
			);

			const items = cart?.items.filter(item => item?.id !== cartItemId);

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
	async (_, thunkAPI) => {
		try {
			const accessToken = thunkAPI.getState().auth.user.accessToken;

			const checkouted = await cartService.checkout(accessToken);

			if (!checkouted) {
				throw new Error();
			}

			// ClientSecret
			sessionStorage.setItem('cs', checkouted.id);
			return checkouted;
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
		const accessToken = thunkAPI.getState().auth.user.accessToken;

		const reseted = await cartService.reset(accessToken);

		sessionStorage.removeItem('cs');

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
export const productSlice = createSlice({
	name: 'cart',
	initialState,
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
			});
	},
});

export default productSlice.reducer;
