import React from 'react';
import {Provider} from 'react-redux';
import {createRoot} from 'react-dom/client';
import {ToastContainer} from 'react-toastify';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import 'react-toastify/dist/ReactToastify.css';
import {store} from 'containers/store';

import Cart from 'pages/Cart';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Register from 'pages/Register';
import ProductDetail from 'pages/ProductDetail';
import CartSuccess from 'pages/CartSuccess';
import OrderHistory from 'pages/OrderHistory';
import OrderHistoryDetail from 'pages/OrderHistoryDetail';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
	// <React.StrictMode>
	<Provider store={store}>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/product/:productId' element={<ProductDetail />} />

				<Route path='/cart' element={<Cart />} />
				<Route path='/cart/success' element={<CartSuccess />} />

				<Route path='/order' element={<OrderHistory />} />
				<Route path='/order/:id' element={<OrderHistoryDetail />} />
			</Routes>
		</BrowserRouter>
		<ToastContainer />
	</Provider>,
	// </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
