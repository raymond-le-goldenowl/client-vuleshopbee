import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import stripeService from './stripeService';

const initialState = {
	stripe: {
		issueItems: [],
		checkout: {},
	},
	isError: false,
	errorCode: null,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const checkout = createAsyncThunk(
	'stripe/checkout',
	async (orderId, thunkAPI) => {
		try {
			//if fine all, let's checkout right here
			const data = await stripeService.checkout(orderId);
			const checkout = data?.checkoutSessions;

			// ! kiểm tra nếu là lỗi về số lượng sản phẩm không đủ.
			if (data?.statusCode === 400 && data?.errorCode === '#400550') {
				// thunkAPI.dispatch(setIssueItems(data?.issueItems || []));
				const error = new Error();
				error.message = data?.message;
				error.statusCode = 400;
				error.errorCode = data?.errorCode;
				error.issueItems = data?.issueItems;
				throw error;
			}

			// save ClientSecret (ClientSecret from checkout response data)
			sessionStorage.setItem('cs', checkout?.id);
			sessionStorage.setItem('orderId', data?.orderId);

			// trả về cho store để hiển thị.
			return checkout;
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();

			if (error?.errorCode === '#400550') {
				return thunkAPI.rejectWithValue({
					message,
					errorCode: error?.errorCode,
					issueItems: error?.issueItems,
				});
			}

			return thunkAPI.rejectWithValue(message);
		}
	},
);

// Create and Export Slice
export const stripeSlice = createSlice({
	name: 'stripe',
	initialState,
	reducers: {
		resetError: state => {
			state.isError = false;
			state.isSuccess = false;
			state.isLoading = false;
			state.message = '';
		},
	},
	extraReducers: builder => {
		builder
			.addCase(checkout.pending, state => {
				state.isLoading = true;
			})
			.addCase(checkout.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.stripe.checkout = action.payload;
			})
			.addCase(checkout.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload.message;
				state.errorCode = action.payload.errorCode;
				state.stripe.issueItems = action.payload.issueItems;
				if (action.payload === 'Network Error') {
					state.message = 'Không thể kết nối tới server';
				}
			});
	},
});

export const {resetError} = stripeSlice.actions;
export default stripeSlice.reducer;
