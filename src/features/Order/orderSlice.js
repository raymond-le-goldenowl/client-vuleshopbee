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

export default orderSlice.reducer;
