import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import productService from './productService';

const initialState = {
	products: [],
	product: {},
	searchValue: '',
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

// Get user goals
export const getProducts = createAsyncThunk(
	'products/get-all',
	async (_, thunkAPI) => {
		try {
			return await productService.getProducts();
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	},
);

export const loadMoreProducts = createAsyncThunk(
	'products/load-more',
	async ({page, perPage}, thunkAPI) => {
		try {
			const {products, searchValue} = thunkAPI.getState().product;
			const loadMoreProducts = await productService.loadMoreProducts(
				page,
				perPage,
				searchValue,
			);

			return await {
				products: products.products.concat(loadMoreProducts.products),
				page: loadMoreProducts.page,
				perPage: loadMoreProducts.perPage,
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

export const getOneProduct = createAsyncThunk(
	'products/get-one',
	async (productId, thunkAPI) => {
		try {
			return await productService.getOneProduct(productId);
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	},
);

export const searchProductByName = createAsyncThunk(
	'products/search-name',
	async (value, thunkAPI) => {
		try {
			return await productService.searchProductByName(value);
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
export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		reset: state => initialState,
		setSearchValue(state, action) {
			state.searchValue = action.payload;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getProducts.pending, state => {
				state.isLoading = true;
			})
			.addCase(getProducts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.products = action.payload;
			})
			.addCase(getProducts.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				if (action.payload === 'Network Error') {
					state.message = 'Không thể kết nối tới server';
				}
			})
			.addCase(loadMoreProducts.pending, state => {
				state.isLoading = true;
			})
			.addCase(loadMoreProducts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.products = action.payload;
			})
			.addCase(loadMoreProducts.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				if (action.payload === 'Network Error') {
					state.message = 'Không thể kết nối tới server';
				}
			})

			.addCase(getOneProduct.pending, state => {
				state.isLoading = true;
			})
			.addCase(getOneProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				// for get one product
				state.product = action.payload;
			})
			.addCase(getOneProduct.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				if (action.payload === 'Network Error') {
					state.message = 'Không thể kết nối tới server';
				}
			})

			.addCase(searchProductByName.pending, state => {
				state.isLoading = true;
			})
			.addCase(searchProductByName.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.products = action.payload;
			})
			.addCase(searchProductByName.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				if (action.payload === 'Network Error') {
					state.message = 'Không thể kết nối tới server';
				}
			});
	},
});

export const {reset, setSearchValue} = productSlice.actions;

export default productSlice.reducer;
