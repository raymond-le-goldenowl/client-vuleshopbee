import {useSelector} from 'react-redux';
import {createBrowserHistory} from 'history';
import {ToastContainer} from 'react-toastify';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Cart from 'features/Cart';
import Home from 'features/Home';
import Login from 'features/Login';
import NotFound from 'features/NotFound';
import Register from 'features/Register';
import ProductDetail from 'features/ProductDetail';
import CartSuccess from 'features/CartSuccess';
import OrderHistory from 'features/OrderHistory';
import OrderHistoryDetail from 'features/OrderHistoryDetail';

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
							<Home />
						</AppLayout>
					}
				/>
				<Route
					path='/login'
					element={
						<AppLayout>
							<Login />
						</AppLayout>
					}
				/>
				<Route
					path='/register'
					element={
						<AppLayout>
							<Register />
						</AppLayout>
					}
				/>
				<Route
					path='/product/:productId'
					element={
						<AppLayout>
							<ProductDetail />
						</AppLayout>
					}
				/>
				{user && (
					<>
						<Route
							path='/account/cart'
							element={
								<AppLayout>
									<Cart />
								</AppLayout>
							}
						/>
						<Route path='/account/cart/success' element={<CartSuccess />} />
						<Route
							path='/account/order'
							element={
								<AppLayout>
									<OrderHistory />
								</AppLayout>
							}
						/>
						<Route
							path='/account/order/:id'
							element={
								<AppLayout>
									<OrderHistoryDetail />
								</AppLayout>
							}
						/>
					</>
				)}

				<Route path='*' element={<NotFound />} />
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
