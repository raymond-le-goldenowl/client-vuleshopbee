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
				{user && (
					<>
						<Route
							path='/account/cart'
							element={
								<AppLayout>
									<CartPage />
								</AppLayout>
							}
						/>
						<Route path='/account/stripe/success' element={<StripeSuccessPage />} />
						<Route
							path='/account/order'
							element={
								<AppLayout>
									<OrderHistoryPage />
								</AppLayout>
							}
						/>
						<Route
							path='/account/order/:id'
							element={
								<AppLayout>
									<OrderHistoryDetailPage />
								</AppLayout>
							}
						/>
					</>
				)}

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
