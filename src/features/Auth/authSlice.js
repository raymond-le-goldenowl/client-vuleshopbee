import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import authService from './authService';

// Get user from localStorage
export const getUserFromLocalStorage = () => {
	// if user from localStorage undefined or not an object will return null
	return localStorage.getItem('auth') &&
		typeof JSON.parse(localStorage.getItem('auth')) === 'object'
		? JSON.parse(localStorage.getItem('auth'))?.accessToken
		: null;
};

const initialState = {
	accessToken: getUserFromLocalStorage(),
	user: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

// Register user
export const register = createAsyncThunk(
	'auth/register',
	async (user, thunkAPI) => {
		try {
			return await authService.register(user);
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	},
);

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
	try {
		return await authService.login(user);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Login user
export const loginWithGoogle = createAsyncThunk(
	'auth/login-google',
	async (googleUserInfo, thunkAPI) => {
		try {
			return await authService.loginWithGoogle(googleUserInfo);
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	},
);

// Login user
export const loginWithFacebook = createAsyncThunk(
	'auth/login-facebook',
	async (facebookUserInfo, thunkAPI) => {
		try {
			return await authService.loginWithFacebook(facebookUserInfo);
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	},
);

export const getProfile = createAsyncThunk(
	'auth/profile-get',
	async (_, thunkAPI) => {
		try {
			const accessToken = thunkAPI.getState().auth?.accessToken;
			const user = await authService.getProfile(accessToken);
			return user;
		} catch (error) {
			if (error?.response?.status === 400) {
				return thunkAPI.rejectWithValue(400);
			}
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	},
);

export const logout = createAsyncThunk('auth/logout', async () => {
	authService.logout();
});

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: state => {
			state.isLoading = false;
			state.isError = false;
			state.isSuccess = false;
			state.message = '';
			state.accessToken = null;
			state.user = {};
			localStorage.removeItem('auth');
		},
	},
	extraReducers: builder => {
		builder
			.addCase(register.pending, state => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				if (action.payload === 'Network Error') {
					state.message = 'Không thể kết nối tới server';
				}
				state.user = null;
			})
			.addCase(logout.fulfilled, state => {
				state.user = null;
			})
			.addCase(login.pending, state => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.accessToken = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				if (action.payload === 'Network Error') {
					state.message = 'Không thể kết nối tới server';
				}
				state.user = null;
			})

			.addCase(loginWithGoogle.pending, state => {
				state.isLoading = true;
			})
			.addCase(loginWithGoogle.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.accessToken = action.payload;
			})
			.addCase(loginWithGoogle.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				if (action.payload === 'Network Error') {
					state.message = 'Không thể kết nối tới server';
				}
				state.user = null;
			})

			.addCase(loginWithFacebook.pending, state => {
				state.isLoading = true;
			})
			.addCase(loginWithFacebook.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.accessToken = action.payload;
			})
			.addCase(loginWithFacebook.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				if (action.payload === 'Network Error') {
					state.message = 'Không thể kết nối tới server';
				}
				state.user = null;
			})

			.addCase(getProfile.pending, state => {
				state.isLoading = true;
			})
			.addCase(getProfile.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(getProfile.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				if (action.payload === 'Network Error') {
					state.message = 'Không thể kết nối tới server';
				}
				state.user = null;
			});
	},
});

export const {reset} = authSlice.actions;

export default authSlice.reducer;
