import {configureStore} from '@reduxjs/toolkit';

import authReducer from './Auth/authSlice';
import productReducer from './Product/productSlice';
import cartReducer from './Cart/cartSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		product: productReducer,
		cart: cartReducer,
	},
});
