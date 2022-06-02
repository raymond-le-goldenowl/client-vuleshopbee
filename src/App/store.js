import {configureStore} from '@reduxjs/toolkit';

import authReducer from '../features/Auth/authSlice';
import cartReducer from '../features/Cart/cartSlice';
import orderReducer from '../features/Order/orderSlice';
import productReducer from '../features/Product/productSlice';
import stripeReducer from '../features/Stripe/stripeSlice';
import categoriesReducer from 'features/Categories/categoriesSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		product: productReducer,
		cart: cartReducer,
		order: orderReducer,
		stripe: stripeReducer,
		category: categoriesReducer,
	},
	devTools: true,
});
