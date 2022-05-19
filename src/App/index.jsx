import {useSelector} from 'react-redux';
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

function App() {
	const browserHistory = createBrowserHistory();
	const {user} = useSelector(state => state.auth);
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

				{/* Start for protected route */}
				<Route
					path='/account/cart'
					element={
						<AppLayout>
							<ProtectedRoute user={user}>
								<CartPage />
							</ProtectedRoute>
						</AppLayout>
					}
				/>
				<Route
					path='/account/stripe/success'
					element={
						<ProtectedRoute user={user}>
							<StripeSuccessPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/account/order'
					element={
						<AppLayout>
							<ProtectedRoute user={user}>
								<OrderHistoryPage />
							</ProtectedRoute>
						</AppLayout>
					}
				/>
				<Route
					path='/account/order/:id'
					element={
						<AppLayout>
							<ProtectedRoute user={user}>
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
