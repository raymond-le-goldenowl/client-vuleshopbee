import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import categoriesService from './categoriesService';

const initialState = {
	categories: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

// Get orders
export const getCategories = createAsyncThunk(
	'categories/get-all',
	async (_, thunkAPI) => {
		try {
			const orders = await categoriesService.getCategories();

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

// Create and Export Slice
export const categoriesSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getCategories.pending, state => {
				state.isLoading = true;
			})
			.addCase(getCategories.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.categories = action.payload;
			})
			.addCase(getCategories.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				if (action.payload === 'Network Error') {
					state.message = 'Không thể kết nối tới server';
				}
			});
	},
});

export const getCategoriesSelector = state => state.category.categories;

export default categoriesSlice.reducer;
