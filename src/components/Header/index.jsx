import {useEffect, useState} from 'react';

import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AiOutlineShoppingCart} from 'react-icons/ai';
import {Box, AppBar, Toolbar, Badge, IconButton, MenuItem} from '@mui/material';

import HeaderSearch from 'components/Header/HeaderSearch';
import MobileNavbar from 'components/Header/MobileNavbar';
import AccountMenuDesktop from 'components/Header/AccountMenuDesktop';
import RenderListAnchorMobile from 'components/Header/RenderListAnchorMobile';
import RenderListAnchorDesktop from 'components/Header/RenderListAnchorDesktop';

import {
	searchProductByName,
	setSearchValue,
} from 'features/Product/productSlice';
import {getCart} from 'features/Cart/cartSlice';
import {getOrders} from 'features/Order/orderSlice';
import {getProfile, logout, reset} from 'features/Auth/authSlice';
import useDebounce from 'hooks/use-debounce';

function Header() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [searchTerm, setSearchTerm] = useState('');
	const [choosePosition, setChoosePosition] = useState({
		left: false,
	});

	const {user} = useSelector(state => state.auth);
	const {cart} = useSelector(state => state.cart);
	const {orders} = useSelector(state => state.order);
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	// profile and order values while rendering
	useEffect(() => {
		dispatch(getProfile());
		dispatch(getOrders());
	}, []);

	// if navigate change should get new cart value
	useEffect(() => {
		dispatch(getCart());
	}, [navigate]);

	// for debounce search feature
	useEffect(() => {
		onSearch(debouncedSearchTerm);
	}, [debouncedSearchTerm]);

	// toggleDrawer for mobile navbar.
	const toggleDrawer = (anchor, open) => event => {
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}

		setChoosePosition({...choosePosition, [anchor]: open});
	};

	const onSearch = value => {
		dispatch(setSearchValue(value));
		dispatch(searchProductByName(value));
	};

	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate('/login');
	};

	return (
		<Box sx={{flexGrow: 1}}>
			<AppBar position='static'>
				<Toolbar>
					<MobileNavbar toggleDrawer={toggleDrawer}>
						<RenderListAnchorMobile
							toggleDrawer={toggleDrawer}
							anchor={'left'}
							user={user}
							onLogout={onLogout}
							orders={orders}
							choosePosition={choosePosition}
						/>
					</MobileNavbar>

					<RenderListAnchorDesktop orders={orders} />

					<HeaderSearch onSearch={setSearchTerm} />

					{user && <AccountMenuDesktop onLogout={onLogout} user={user} />}

					{!user && (
						<Box
							sx={{
								flexGrow: 0,
								display: {
									xs: 'none',
									md: 'flex',
								},
								alignItems: 'cener',
								margin: '0 10px',
							}}>
							<MenuItem component={Link} to='/login'>
								Đăng nhập
							</MenuItem>
						</Box>
					)}

					{user && (
						<Box sx={{flexGrow: 0, display: 'flex', alignItems: 'center'}}>
							<IconButton
								size='large'
								aria-label='Show total of item in cart'
								color='inherit'
								component={Link}
								to={'/account/cart'}>
								<Badge badgeContent={cart?.total || 0} color='error'>
									<AiOutlineShoppingCart />
								</Badge>
							</IconButton>
						</Box>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
}

Header.propTypes = {};

export default Header;
