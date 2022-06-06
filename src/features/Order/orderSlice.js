import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import orderService from './orderService';

const initialState = {
	orders: [],
	orderDetail: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

// Get orders
export const getOrders = createAsyncThunk(
	'order/get-all',
	async (_, thunkAPI) => {
		try {
			const orders = await orderService.getOrders();

			return orders;
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	},
);

// updateQuantityCartItem
export const updateQuantityOrderItem = createAsyncThunk(
	'order/update-quantity-order-item',
	async ({quantity, orderItemId, productId}, thunkAPI) => {
		try {
			// get cart from state to get orderId.
			// order: là được khai báo bên file  store.js
			const orderDetail = thunkAPI.getState().order.orderDetail;
			// const orders = thunkAPI.getState().order.orders;
			// const order = orders.find(order => order?.id === orderItemId);
			const updated = await orderService.updateQuantityOrderItem(
				quantity,
				orderDetail.id,
				orderItemId,
				productId,
			);

			// make new cart items
			const items = orderDetail?.orderItems.map(item => {
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

			return {
				...updated,
				orderItems: items,
				total,
				id: orderDetail?.id,
				amount: updated?.amount || orderDetail?.amount || 0,
			};
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
export const removeOrderItem = createAsyncThunk(
	'order/remove-order-item',
	async ({cartItemId, productId}, thunkAPI) => {
		try {
			// get cart from state to get cartId.
			const cart = thunkAPI.getState().cart.cart;

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

export const createOrder = createAsyncThunk(
	'order/create-one',
	async ({description, receiver}, thunkAPI) => {
		try {
			const created = await orderService.createOrder(description, receiver);

			return created;
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	},
);

export const getOneOrder = createAsyncThunk(
	'order/get-one',
	async (id, thunkAPI) => {
		try {
			const oneOrder = await orderService.getOneOrder(id);

			return oneOrder;
		} catch (error) {
			if (error?.response?.data?.statusCode === 500) {
				return thunkAPI.rejectWithValue(500);
			}
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	},
);

// Create and Export Slice
export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		resetError: state => {
			state.isError = false;
			state.isSuccess = false;
			state.isLoading = false;
			state.message = '';
		},
		// update at local (use this function with debounce issue)
		updateOrderLocal: (state, action) => {
			const {quantity, orderItemId} = action.payload;

			// get cart items
			const currentItems = state.orderDetail?.orderItems;
			// update quantity of cart item
			const itemsUpdated = currentItems.map(item => {
				if (item?.id === orderItemId) {
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

			const amount = itemsUpdated.reduce(
				(previousValue, currentValue, _currentIndex, _array) => {
					return (
						previousValue + currentValue.quantity * currentValue?.product?.price
					);
				},
				0,
			);

			// set data
			state.orderDetail.orderItems = itemsUpdated;
			state.orderDetail.total = total;
			state.orderDetail.amount = amount;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getOrders.pending, state => {
				state.isLoading = true;
			})
			.addCase(getOrders.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.orders = action.payload;
			})
			.addCase(getOrders.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				if (action.payload === 'Network Error') {
					state.message = 'Không thể kết nối tới server';
				}
			})

			.addCase(updateQuantityOrderItem.pending, state => {
				state.isLoading = true;
			})
			.addCase(updateQuantityOrderItem.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.orderDetail = action.payload;
			})
			.addCase(updateQuantityOrderItem.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				if (action.payload === 'Network Error') {
					state.message = 'Không thể kết nối tới server';
				}
			})

			.addCase(createOrder.pending, state => {
				state.isLoading = true;
			})
			.addCase(createOrder.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.orderDetail = action.payload;
			})
			.addCase(createOrder.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				if (action.payload === 'Network Error') {
					state.message = 'Không thể kết nối tới server';
				}
			})

			.addCase(getOneOrder.pending, state => {
				state.isLoading = true;
			})
			.addCase(getOneOrder.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.orderDetail = action.payload;
			})
			.addCase(getOneOrder.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				if (action.payload === 'Network Error') {
					state.message = 'Không thể kết nối tới server';
				}
			});
	},
});

export const {updateOrderLocal, resetError} = orderSlice.actions;

export const getOrdersForHistoryPageSelector = state => {
	return state.order.orders.map((order, index) => ({
		...order,
		rowIndex: index + 1,
	}));
};
export default orderSlice.reducer;
