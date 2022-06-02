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

// Get cart
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

		return {items: cart.cartItem, total, cartId: cart?.id, checkout: {}};
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	} finally {
		thunkAPI.dispatch(setTotalLocalCartItems());
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
		resetToInital: () => initialState,
		// update at local (use this function with debounce issue)
		updateCartLocal: (state, action) => {
			const {quantity, cartItemId, productId} = action.payload;
			let isFullQuantity = false;
			// get cart items
			const currentItems = state.cart?.items;

			// update quantity of cart item
			const itemsUpdated = currentItems.map(item => {
				if (quantity === item.product.quantity) {
					isFullQuantity = true;
				}
				if (item?.id === cartItemId) {
					item.quantity = quantity;
				} else if (!cartItemId && productId && productId === item.product.id) {
					item.quantity = quantity;
				}

				return item;
			});

			if (isFullQuantity) return null;

			// calculate total of product quantity in cart
			let total = itemsUpdated.reduce(
				(previousValue, currentValue, _currentIndex, _array) => {
					return previousValue + currentValue.quantity;
				},
				0,
			);

			const isNotInCart = currentItems.some(
				item => !(item.product.id === productId),
			);
			// if cart doesn't any items, we just update quantity of cart with signle click on the button (add product to cart button)
			if (currentItems.length === 0 || isNotInCart) {
				// set data
				total = state.cart.total + 1;
				state.cart.items = itemsUpdated;
			}

			// set data
			state.cart.items = itemsUpdated;
			state.cart.total = total;
		},
		saveItemsToLocalStorage: (state, action) => {
			const data = cartService.saveItemsToLocalStorage(action.payload);
			const total = data.reduce((prev, curr) => prev + curr.quantity, 0);
			state.cart.total = total;
		},
		updateItemLocalStorage: (state, action) => {
			const data = cartService.updateItemLocalStorage(action.payload);
			const total = data.reduce((prev, curr) => prev + curr.quantity, 0);
			state.cart.total = total;
		},
		removeItemLocalStorage: (state, action) => {
			const data = cartService.removeItemLocalStorage(action.payload);
			const total = data.reduce((prev, curr) => prev + curr.quantity, 0);
			state.cart.total = total;
		},
		setTotalLocalCartItems: state => {
			const localCartItems = cartService.getCartLocal();
			const total =
				localCartItems.reduce((prev, curr) => prev + curr.quantity, 0) || 0;
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
		(prev, curr) => prev + (curr.quantity || 0) * (curr?.product?.price || 0),
		0,
	);
};

export const {
	updateCartLocal,
	saveItemsToLocalStorage,
	updateItemLocalStorage,
	setTotalLocalCartItems,
	resetError,
	resetToInital,
	removeItemLocalStorage,
} = cartSlice.actions;
export default cartSlice.reducer;
