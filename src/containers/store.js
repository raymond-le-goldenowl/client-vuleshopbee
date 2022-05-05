import {configureStore} from '@reduxjs/toolkit';

import authReducer from './Auth/authSlice';
import productReducer from './Product/productSlice';
import cartReducer from './Cart/cartSlice';
import orderReducer from './Order/orderSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		product: productReducer,
		cart: cartReducer,
		order: orderReducer,
	},
	devTools: true,
});
