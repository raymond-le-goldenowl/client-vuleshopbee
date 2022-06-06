import {createBrowserHistory} from 'history';
import {ToastContainer} from 'react-toastify';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {HomePage} from 'features/Home';
import {CartPage} from 'features/Cart';
import {NotFoundPage} from 'features/NotFound';
import {StripeSuccessPage} from 'features/Stripe';
import {ProductDetailPage} from 'features/Product';
import {LoginPage, RegisterPage} from 'features/Auth';
import {OrderHistoryPage, OrderHistoryDetailPage} from 'features/Order';

import AppLayout from './AppLayout';
import ProtectedRoute from 'components/ProtectedRoute';
import ShopPage from 'features/Shop/ShopPage';
import AccountPage from 'features/Account/AccountPage';

import {useLayoutEffect} from 'react';
import {getProfile} from 'features/Auth/authSlice';
import {useDispatch} from 'react-redux';

function App() {
	const browserHistory = createBrowserHistory();
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		dispatch(getProfile());
	}, []);

	return (
		<BrowserRouter history={browserHistory}>
			<Routes>
				<Route
					path='/'
					element={
						<AppLayout>
							<HomePage />
						</AppLayout>
					}
				/>
				<Route
					path='/login'
					element={
						<AppLayout>
							<LoginPage />
						</AppLayout>
					}
				/>
				<Route
					path='/shop'
					element={
						<AppLayout>
							<ShopPage />
						</AppLayout>
					}
				/>
				<Route
					path='/register'
					element={
						<AppLayout>
							<RegisterPage />
						</AppLayout>
					}
				/>
				<Route
					path='/product/:productId'
					element={
						<AppLayout>
							<ProductDetailPage />
						</AppLayout>
					}
				/>
				<Route
					path='/account/cart'
					element={
						<AppLayout>
							<CartPage />
						</AppLayout>
					}
				/>

				{/* Start for protected route */}

				<Route
					path='/account'
					element={
						<AppLayout>
							<ProtectedRoute>
								<AccountPage />
							</ProtectedRoute>
						</AppLayout>
					}
				/>

				<Route path='/account/stripe/success' element={<StripeSuccessPage />} />
				<Route
					path='/account/order'
					element={
						<AppLayout>
							<ProtectedRoute>
								<OrderHistoryPage />
							</ProtectedRoute>
						</AppLayout>
					}
				/>
				<Route
					path='/account/order/:id'
					element={
						<AppLayout>
							<ProtectedRoute>
								<OrderHistoryDetailPage />
							</ProtectedRoute>
						</AppLayout>
					}
				/>
				{/* End of protected route */}

				<Route path='*' element={<NotFoundPage />} />
			</Routes>
			<ToastContainer
				position='bottom-left'
				autoClose={1000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				limit={5}
			/>
		</BrowserRouter>
	);
}

export default App;
