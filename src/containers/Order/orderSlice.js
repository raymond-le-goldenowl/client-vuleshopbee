import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import orderService from './orderService';

const initialState = {
	orders: [],
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
			const accessToken = thunkAPI.getState().auth.user.accessToken;
			const orders = await orderService.getOrders(accessToken);

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
			const accessToken = thunkAPI.getState().auth.user.accessToken;
			const created = await orderService.createOrder(
				accessToken,
				description,
				receiver,
			);

			console.log('created => ', created);
			// return created;
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
			const accessToken = thunkAPI.getState().auth.user.accessToken;
			const oneOrder = await orderService.getOneOrder(accessToken, id);

			return oneOrder;
		} catch (error) {
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
			})

			.addCase(createOrder.pending, state => {
				state.isLoading = true;
			})
			.addCase(createOrder.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				// state.orders = action.payload;
			})
			.addCase(createOrder.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})

			.addCase(getOneOrder.pending, state => {
				state.isLoading = true;
			})
			.addCase(getOneOrder.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.orders = [action.payload];
			})
			.addCase(getOneOrder.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export default orderSlice.reducer;
